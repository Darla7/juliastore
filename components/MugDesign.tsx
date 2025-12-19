import React, { useState, useRef, useEffect } from 'react';
import { Upload, Type, Trash2, RotateCcw, Download } from 'lucide-react';

interface TextElement {
  type: 'text';
  content: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
}

interface ImageElement {
  type: 'image';
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
}

type DesignElement = TextElement | ImageElement;

const MugWrapDesigner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'flat' | '3d'>('flat');
  const [rotation, setRotation] = useState(0);

  // Mug specifications (11oz standard mug)
  const mugSpecs = {
    circumference: 10.5,
    height: 3.75,
    pixelsPerInch: 100,
    canvasWidth: 1050,
    canvasHeight: 375,
    handlePosition: 525
  };

  const drawCanvas = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw seam indicator (where wrap meets at handle)
    ctx.strokeStyle = '#ff6b6b';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(mugSpecs.handlePosition, 0);
    ctx.lineTo(mugSpecs.handlePosition, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw seam label
    ctx.fillStyle = '#ff6b6b';
    ctx.font = '12px Arial';
    ctx.fillText('← Handle/Seam Position →', mugSpecs.handlePosition - 80, 15);

    // Draw all elements
    elements.forEach((element, index) => {
      if (element.type === 'text') {
        ctx.fillStyle = element.color || '#000000';
        ctx.font = `${element.fontSize || 40}px ${element.fontFamily || 'Arial'}`;
        ctx.fillText(element.content, element.x, element.y);
      } else if (element.type === 'image' && element.img) {
        ctx.drawImage(element.img, element.x, element.y, element.width, element.height);
      }

      // Draw selection border
      if (selectedElement === index) {
        ctx.strokeStyle = '#2196F3';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        if (element.type === 'text') {
          const metrics = ctx.measureText(element.content);
          ctx.strokeRect(
            element.x - 5,
            element.y - (element.fontSize || 40) - 5,
            metrics.width + 10,
            (element.fontSize || 40) + 10
          );
        } else if (element.type === 'image') {
          ctx.strokeRect(element.x - 5, element.y - 5, element.width + 10, element.height + 10);
        }
        ctx.setLineDash([]);
      }
    });

    // Draw wrap indicators
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.font = '14px Arial';
    ctx.fillText('← Left Edge (wraps to right)', 10, canvas.height - 10);
    ctx.fillText('Right Edge (wraps to left) →', canvas.width - 200, canvas.height - 10);
  }, [elements, selectedElement, mugSpecs.handlePosition]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const addText = () => {
    const newText: TextElement = {
      type: 'text',
      content: 'Your Text Here',
      x: 200,
      y: 150,
      fontSize: 40,
      fontFamily: 'Arial',
      color: '#000000'
    };
    setElements([...elements, newText]);
    setSelectedElement(elements.length);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 200;
        const maxHeight = 200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }

        const newImage: ImageElement = {
          type: 'image',
          img: img,
          x: 100,
          y: 100,
          width: width,
          height: height
        };
        setElements([...elements, newImage]);
        setSelectedElement(elements.length);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if clicking on an element
    for (let i = elements.length - 1; i >= 0; i--) {
      const element = elements[i];
      let isHit = false;

      if (element.type === 'text') {
        ctx.font = `${element.fontSize || 40}px ${element.fontFamily || 'Arial'}`;
        const metrics = ctx.measureText(element.content);
        isHit = x >= element.x && x <= element.x + metrics.width &&
                y >= element.y - (element.fontSize || 40) && y <= element.y;
      } else if (element.type === 'image') {
        isHit = x >= element.x && x <= element.x + element.width &&
                y >= element.y && y <= element.y + element.height;
      }

      if (isHit) {
        setSelectedElement(i);
        setIsDragging(true);
        setDragOffset({ x: x - element.x, y: y - element.y });
        return;
      }
    }

    setSelectedElement(null);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || selectedElement === null) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const updatedElements = [...elements];
    updatedElements[selectedElement] = {
      ...updatedElements[selectedElement],
      x: x - dragOffset.x,
      y: y - dragOffset.y
    };
    setElements(updatedElements);
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const deleteSelected = () => {
    if (selectedElement !== null) {
      setElements(elements.filter((_, i) => i !== selectedElement));
      setSelectedElement(null);
    }
  };

  const updateSelectedText = (property: keyof TextElement, value: string | number) => {
    if (selectedElement !== null && elements[selectedElement]?.type === 'text') {
      const updated = [...elements];
      updated[selectedElement] = { ...updated[selectedElement], [property]: value } as TextElement;
      setElements(updated);
    }
  };

  const clearAll = () => {
    if (confirm('Clear all elements?')) {
      setElements([]);
      setSelectedElement(null);
    }
  };

  const exportDesign = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'mug-design-360.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const selectedEl = selectedElement !== null ? elements[selectedElement] : null;

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">360° Mug Wrap Designer</h1>
          <p className="text-sm text-gray-600">Design wraps around entire mug (10.5&quot; × 3.75&quot;)</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'flat' ? '3d' : 'flat')}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            {viewMode === 'flat' ? 'Show 3D Preview' : 'Show Flat Canvas'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="w-64 bg-white shadow-lg p-4 overflow-y-auto">
          <h2 className="font-bold text-lg mb-4">Tools</h2>
          
          <div className="space-y-2 mb-6">
            <button
              onClick={addText}
              className="w-full flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Type size={20} />
              Add Text
            </button>
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Upload size={20} />
              Upload Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            <button
              onClick={deleteSelected}
              disabled={selectedElement === null}
              className="w-full flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={20} />
              Delete Selected
            </button>

            <button
              onClick={clearAll}
              className="w-full flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <RotateCcw size={20} />
              Clear All
            </button>

            <button
              onClick={exportDesign}
              className="w-full flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              <Download size={20} />
              Export Design
            </button>
          </div>

          {/* Properties Panel */}
          {selectedEl?.type === 'text' && (
            <div className="border-t pt-4">
              <h3 className="font-bold mb-3">Text Properties</h3>
              
              <label className="block mb-2">
                <span className="text-sm text-gray-700">Text:</span>
                <input
                  type="text"
                  value={selectedEl.content}
                  onChange={(e) => updateSelectedText('content', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded"
                />
              </label>

              <label className="block mb-2">
                <span className="text-sm text-gray-700">Font Size:</span>
                <input
                  type="range"
                  min="20"
                  max="120"
                  value={selectedEl.fontSize}
                  onChange={(e) => updateSelectedText('fontSize', parseInt(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm">{selectedEl.fontSize}px</span>
              </label>

              <label className="block mb-2">
                <span className="text-sm text-gray-700">Font:</span>
                <select
                  value={selectedEl.fontFamily}
                  onChange={(e) => updateSelectedText('fontFamily', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded"
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Comic Sans MS">Comic Sans MS</option>
                </select>
              </label>

              <label className="block mb-2">
                <span className="text-sm text-gray-700">Color:</span>
                <input
                  type="color"
                  value={selectedEl.color}
                  onChange={(e) => updateSelectedText('color', e.target.value)}
                  className="w-full mt-1 h-10 border rounded"
                />
              </label>
            </div>
          )}

          {/* Info Panel */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-bold mb-2 text-sm">Design Tips:</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Red dashed line = seam at handle</li>
              <li>• Design wraps 360° around mug</li>
              <li>• Left edge connects to right edge</li>
              <li>• Keep important elements away from seam</li>
              <li>• Full circumference: 10.5 inches</li>
              <li>• Height: 3.75 inches</li>
            </ul>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 p-8 overflow-auto flex items-center justify-center bg-gray-50">
          {viewMode === 'flat' ? (
            <div className="bg-white shadow-xl rounded-lg p-4">
              <canvas
                ref={canvasRef}
                width={mugSpecs.canvasWidth}
                height={mugSpecs.canvasHeight}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                className="border-2 border-gray-300 cursor-move"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <p className="text-center text-sm text-gray-600 mt-2">
                Click and drag elements to reposition
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-white shadow-xl rounded-lg p-8 mb-4">
                <div 
                  className="relative mx-auto"
                  style={{
                    width: '400px',
                    height: '400px',
                    perspective: '1000px'
                  }}
                >
                  {/* Simple 3D Mug Visualization */}
                  <div 
                    className="relative mx-auto bg-linear-to-b from-gray-100 to-white rounded-t-lg"
                    style={{
                      width: '250px',
                      height: '300px',
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${rotation}deg)`,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                      border: '3px solid #ddd',
                      marginTop: '50px'
                    }}
                  >
                    {/* Mug Body */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <canvas
                        width={mugSpecs.canvasWidth / 4}
                        height={mugSpecs.canvasHeight / 4}
                        ref={(canvas) => {
                          if (canvas) {
                            const ctx = canvas.getContext('2d');
                            const sourceCanvas = canvasRef.current;
                            if (sourceCanvas && ctx) {
                              ctx.drawImage(sourceCanvas, 0, 0, canvas.width, canvas.height);
                            }
                          }
                        }}
                        style={{
                          width: '200px',
                          height: 'auto',
                          borderRadius: '5px'
                        }}
                      />
                    </div>
                    
                    {/* Handle */}
                    <div 
                      className="absolute bg-white border-4 border-gray-300 rounded-full"
                      style={{
                        right: '-40px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '60px',
                        height: '80px',
                        clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
                      }}
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm text-gray-700 mb-2">Rotate Mug:</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={rotation}
                    onChange={(e) => setRotation(parseInt(e.target.value))}
                    className="w-64"
                  />
                  <p className="text-sm text-gray-600 mt-2">{rotation}°</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">Rotate to see how your design wraps around the mug</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MugWrapDesigner;