'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, FabricImage, Rect, Textbox, FabricObject, Shadow, Path, FabricText } from 'fabric';
import { printOnDemandProducts } from '@/data/products';


export default function DesignPage() {
  const { productId } = useParams();
  const canvasRef = useRef<Canvas | null>(null);
  const mockupRef = useRef<FabricImage | null>(null);
  const printAreaRef = useRef<Rect | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [product] = useState(() =>
    printOnDemandProducts.find(p => p.id === productId)
  );
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(40);
  const [selectedObject, setSelectedObject] = useState<FabricObject | null>(null);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [shadowBlur, setShadowBlur] = useState(0);
  const [textEffect, setTextEffect] = useState<'none' | 'curved-top' | 'curved-bottom'>('none');
  const [curveRadius, setCurveRadius] = useState(100);
  const [rotation, setRotation] = useState(0); // NEW: Track rotation
  const [textContent, setTextContent] = useState(''); // NEW: Track text content for editing
  const [charSpacing, setCharSpacing] = useState(0); // NEW: Track character spacing
  const [mugRotation, setMugRotation] = useState(0); // NEW: 0-360° rotation of mug wrap


  const fontOptions = [
    'Arial', 'Helvetica', 'Times New Roman', 'Courier New', 'Verdana',
    'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS',
    'Trebuchet MS', 'Arial Black', 'Impact', 'Lucida Sans', 'Tahoma',
    'Courier', 'Lucida Console', 'Monaco', 'Brush Script MT', 'Copperplate',
    'Papyrus', 'Optima', 'Didot', 'American Typewriter', 'Futura'
  ];

  // Extend FabricObject to include a custom `data` property
interface FabricObjectWithData extends FabricObject {
  data?: {
    originalLeft?: number;
    originalTop?: number; // ✅ add this
  };
}


const applyMugRotation = (angle: number) => {
  if (!canvasRef.current || !product?.designer) return;

  const canvas = canvasRef.current;
  const { width: wrapWidth, height: wrapHeight } = product.designer.printArea;

  const radians = (angle / 360) * 2 * Math.PI;

  // Center of wrap
  const centerX = wrapWidth / 2;
  const centerY = wrapHeight / 2;

  canvas.getObjects().forEach((obj) => {
    if (obj === mockupRef.current || obj === printAreaRef.current) return;

    const objWithData = obj as FabricObjectWithData;

    if (!objWithData.data) objWithData.data = {};
    if (objWithData.data.originalLeft === undefined) objWithData.data.originalLeft = obj.left || 0;
    if (objWithData.data.originalTop === undefined) objWithData.data.originalTop = obj.top || 0;

    const originalLeft = objWithData.data.originalLeft ?? 0;
    const originalTop = objWithData.data.originalTop ?? 0;

    const offsetX = originalLeft - centerX;

    const newX = centerX + offsetX * Math.cos(radians);
    const newY = centerY + offsetX * Math.sin(radians) * 0.3; // flatten effect

    // Apply curved path adjustment if text has a path
    if ((obj.type === 'text' || obj.type === 'textbox') && (obj as FabricText).path) {
      const textObj = obj as FabricText;
      const pathRadius = curveRadius;
      const textWidth = (textObj.text?.length || 1) * (textObj.fontSize || 40) * 0.6;
      const startAngle = radians; // rotate path along mug

      const pathString = textEffect === 'curved-top'
        ? `M ${-textWidth / 2} 0 Q 0 ${-pathRadius} ${textWidth / 2} 0`
        : `M ${-textWidth / 2} 0 Q 0 ${pathRadius} ${textWidth / 2} 0`;

      textObj.path?.set({ 
        left: newX,
        top: newY,
        angle: startAngle * (180 / Math.PI), // rotate the path
      });
    } else {
      objWithData.set({ left: newX, top: newY });
    }
  });

  canvas.renderAll();
};




  const loadVariant = useCallback((canvas: Canvas, variantIndex: number) => {
    if (!product?.designer) return;

    const variant = product.designer.variants[variantIndex];

    FabricImage.fromURL(variant.mockup, { crossOrigin: 'anonymous' })
      .then(img => {
        if (!product.designer) return;

        const scale = Math.min(
          (canvas.width * 0.9) / img.width,
          (canvas.height * 0.9) / img.height
        );

        img.scale(scale);
        img.set({
          left: canvas.width / 2,
          top: canvas.height / 2,
          originX: 'center',
          originY: 'center',
          selectable: false,
          evented: false,
        });

        // Remove old mockup if exists
        if (mockupRef.current) {
          canvas.remove(mockupRef.current);
        }
        mockupRef.current = img;
        canvas.add(img);
        canvas.sendObjectToBack(img);

        // Add/update print area overlay
        const { x, y, width, height } = product.designer.printArea;
        
        if (printAreaRef.current) {
          canvas.remove(printAreaRef.current);
        }
        
        const printArea = new Rect({
          left: x,
          top: y,
          width,
          height,
          fill: 'rgba(0,0,0,0.03)',
          stroke: '#4f46e5',
          strokeDashArray: [8, 6],
          selectable: false,
          evented: false,
        });

        printAreaRef.current = printArea;
        canvas.add(printArea);
        canvas.bringObjectToFront(printArea);
        canvas.renderAll();
      })
      .catch(err => {
        console.error('Error loading image:', err);
      });
  }, [product]);

  useEffect(() => {
    if (!product?.designer || canvasRef.current) return;

    const canvas = new Canvas('designer-canvas', {
      width: product.designer.canvas.width,
      height: product.designer.canvas.height,
      backgroundColor: '#f0f0f0',
    });

    canvasRef.current = canvas;

    // Track selection changes
    canvas.on('selection:created', (e) => {
      const selected = e.selected?.[0];
      if (selected) {
        setSelectedObject(selected);
        setRotation(selected.angle || 0); // NEW: Update rotation state
        // Update text content if it's a text object
        if (selected.type === 'textbox' || selected.type === 'text') {
          const textObj = selected as Textbox | FabricText;
          setTextContent(textObj.text || '');
          setCharSpacing(textObj.charSpacing || 0);
        }
      }
    });
    canvas.on('selection:updated', (e) => {
      const selected = e.selected?.[0];
      if (selected) {
        setSelectedObject(selected);
        setRotation(selected.angle || 0); // NEW: Update rotation state
        // Update text content if it's a text object
        if (selected.type === 'textbox' || selected.type === 'text') {
          const textObj = selected as Textbox | FabricText;
          setTextContent(textObj.text || '');
          setCharSpacing(textObj.charSpacing || 0);
        }
      }
    });
    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
      setRotation(0); // NEW: Reset rotation state
      setTextContent('');
      setCharSpacing(0);
    });

    // NEW: Track rotation changes
    canvas.on('object:rotating', (e) => {
      if (e.target) {
        setRotation(Math.round(e.target.angle || 0));
      }
    });

    // Enforce print area boundaries
    canvas.on('object:moving', (e) => {
      const obj = e.target;
      if (!obj || !product.designer) return;
      
      const { x, y, width, height } = product.designer.printArea;
      const objBounds = obj.getBoundingRect();
      
      if (objBounds.left < x) obj.left = x + (obj.left! - objBounds.left);
      if (objBounds.top < y) obj.top = y + (obj.top! - objBounds.top);
      if (objBounds.left + objBounds.width > x + width) {
        obj.left = x + width - objBounds.width + (obj.left! - objBounds.left);
      }
      if (objBounds.top + objBounds.height > y + height) {
        obj.top = y + height - objBounds.height + (obj.top! - objBounds.top);
      }
    });

    loadVariant(canvas, 0);

    return () => {
      canvas.dispose();
      canvasRef.current = null;
    };
  }, [product, loadVariant]);

  const handleVariantChange = (index: number) => {
    setSelectedVariant(index);
    if (canvasRef.current) {
      loadVariant(canvasRef.current, index);
    }
  };

  const addText = () => {
    if (!canvasRef.current || !product?.designer) return;
    
    const { x, y, width, height } = product.designer.printArea;
    const text = new Textbox('Your text here', {
      left: x + width / 2,
      top: y + height / 2,
      fontSize: fontSize,
      fill: textColor,
      fontFamily: fontFamily,
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      editable: true,
      width: 200,
      stroke: strokeWidth > 0 ? strokeColor : undefined,
      strokeWidth: strokeWidth,
      shadow: shadowBlur > 0 ? new Shadow({
        color: 'rgba(0,0,0,0.5)',
        blur: shadowBlur,
        offsetX: 2,
        offsetY: 2,
      }) : null,
      charSpacing: charSpacing, // NEW: Add character spacing
      // Enable rotation controls
      hasRotatingPoint: true,
      lockRotation: false,
    });

    canvasRef.current.add(text);
    canvasRef.current.setActiveObject(text);
    canvasRef.current.renderAll();
    
    <div className="mb-4">
  <label className="block text-sm font-medium mb-2">
    Rotate Mug Wrap: {mugRotation}°
  </label>
  <input
    type="range"
    min={0}
    max={360}
    value={mugRotation}
    onChange={(e) => {
      const angle = Number(e.target.value);
      setMugRotation(angle);
      applyMugRotation(angle);
    }}
    className="w-full"
  />
</div>


    // Enter edit mode immediately
    text.enterEditing();
    text.selectAll();
  };

  const addSticker = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvasRef.current || !product?.designer) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgUrl = event.target?.result as string;
      
      FabricImage.fromURL(imgUrl, { crossOrigin: 'anonymous' })
        .then(img => {
          if (!product.designer || !canvasRef.current) return;

          const { x, y, width, height } = product.designer.printArea;
          const maxSize = Math.min(width, height) * 0.3;
          const scale = maxSize / Math.max(img.width, img.height);

          img.scale(scale);
          img.set({
            left: x + width / 2,
            top: y + height / 2,
            originX: 'center',
            originY: 'center',
          });

          canvasRef.current.add(img);
          
          // Bring the image in front of the print area overlay
          if (printAreaRef.current) {
            canvasRef.current.bringObjectToFront(printAreaRef.current);
          }
          
          canvasRef.current.setActiveObject(img);
          canvasRef.current.renderAll();
        })
        .catch(err => {
          console.error('Error loading uploaded image:', err);
        });
    };
    reader.readAsDataURL(file);
    
    // Reset the input so the same file can be selected again
    e.target.value = '';
  };

  // NEW: Copy/Duplicate selected object
  const duplicateSelected = async () => {
    if (!canvasRef.current || !selectedObject) return;

    try {
      const cloned = await selectedObject.clone();
      
      if (!canvasRef.current) return;
      
      // Offset the clone slightly so it's visible
      cloned.set({
        left: (cloned.left || 0) + 20,
        top: (cloned.top || 0) + 20,
      });

      canvasRef.current.add(cloned);
      
      // Bring the print area overlay to front if it exists
      if (printAreaRef.current) {
        canvasRef.current.bringObjectToFront(printAreaRef.current);
      }
      
      canvasRef.current.setActiveObject(cloned);
      canvasRef.current.renderAll();
    } catch (error) {
      console.error('Error duplicating object:', error);
    }
  };

  const bringForward = () => {
    if (!canvasRef.current || !selectedObject) return;
    canvasRef.current.bringObjectForward(selectedObject);
    canvasRef.current.renderAll();
  };

  const sendBackward = () => {
    if (!canvasRef.current || !selectedObject) return;
    canvasRef.current.sendObjectBackwards(selectedObject);
    canvasRef.current.renderAll();
  };

  const deleteSelected = () => {
    if (!canvasRef.current || !selectedObject) return;
    canvasRef.current.remove(selectedObject);
    setSelectedObject(null);
    canvasRef.current.renderAll();
  };

  // NEW: Update character spacing
  const updateCharSpacing = (spacing: number) => {
    setCharSpacing(spacing);
    const isTextObject = selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text');
    if (isTextObject) {
      selectedObject.set('charSpacing', spacing);
      canvasRef.current?.renderAll();
    }
  };

  // NEW: Update text content
  const updateTextContent = (newText: string) => {
    setTextContent(newText);
    const isTextObject = selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text');
    if (isTextObject) {
      const textObj = selectedObject as Textbox | FabricText;
      textObj.set('text', newText);
      
      // If it's curved text, we need to recreate it to update the path
      if (selectedObject.type === 'text' && textEffect !== 'none') {
        applyCurvedText(textEffect);
      } else {
        canvasRef.current?.renderAll();
      }
    }
  };

  const updateTextColor = (color: string) => {
    setTextColor(color);
    const isTextObject = selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text');
    if (isTextObject) {
      selectedObject.set('fill', color);
      canvasRef.current?.renderAll();
    }
  };

  const updateFontSize = (size: number) => {
    setFontSize(size);
    const isTextObject = selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text');
    if (isTextObject) {
      selectedObject.set('fontSize', size);
      canvasRef.current?.renderAll();
    }
  };

  const updateFontFamily = (font: string) => {
    setFontFamily(font);
    const isTextObject = selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text');
    if (isTextObject) {
      selectedObject.set('fontFamily', font);
      canvasRef.current?.renderAll();
    }
  };

  

  // NEW: Update rotation from slider
  const updateRotation = (angle: number) => {
    setRotation(angle);
    if (selectedObject) {
      selectedObject.rotate(angle);
      canvasRef.current?.renderAll();
    }
  };

  

  const updateStrokeWidth = (width: number) => {
    setStrokeWidth(width);
    const isTextObject = selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text');
    if (isTextObject) {
      selectedObject.set({
        stroke: width > 0 ? strokeColor : undefined,
        strokeWidth: width,
      });
      canvasRef.current?.renderAll();
    }
  };

  const updateStrokeColor = (color: string) => {
    setStrokeColor(color);
    const isTextObject = selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text');
    if (isTextObject && strokeWidth > 0) {
      selectedObject.set('stroke', color);
      canvasRef.current?.renderAll();
    }
  };

  const updateShadowBlur = (blur: number) => {
    setShadowBlur(blur);
    const isTextObject = selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text');
    if (isTextObject) {
      if (blur > 0) {
        selectedObject.set('shadow', new Shadow({
          color: 'rgba(0,0,0,0.5)',
          blur: blur,
          offsetX: 2,
          offsetY: 2,
        }));
      } else {
        selectedObject.set('shadow', null);
      }
      canvasRef.current?.renderAll();
    }
  };

  const applyCurvedText = (effect: 'none' | 'curved-top' | 'curved-bottom') => {
    setTextEffect(effect);
    if (!selectedObject || !canvasRef.current) return;
    
    // Check if it's a text object (textbox or text)
    const isTextObject = selectedObject.type === 'textbox' || selectedObject.type === 'text';
    if (!isTextObject) return;

    const textObj = selectedObject as Textbox | FabricText;
    const text = textObj.text || '';
    
    if (effect === 'none') {
      // Reset to normal text - clear the path
      textObj.set({ 
        path: undefined,
      });
      canvasRef.current.renderAll();
      return;
    }

    // For curved text, we use FabricText (not Textbox) with path
    // Get current properties including rotation
    const currentProps = {
      text: text,
      left: textObj.left,
      top: textObj.top,
      fontSize: textObj.fontSize,
      fill: textObj.fill,
      fontFamily: textObj.fontFamily,
      stroke: textObj.stroke,
      strokeWidth: textObj.strokeWidth,
      shadow: textObj.shadow,
      angle: textObj.angle || 0, // Preserve rotation
      charSpacing: textObj.charSpacing || 0, // Preserve character spacing
    };

    // Remove the old text object
    canvasRef.current.remove(textObj);

    // Create curved path
    const radius = curveRadius;
    const textWidth = text.length * (currentProps.fontSize || 40) * 0.6;
    
    // Create an arc path - M moves to start, Q is quadratic curve
    const pathString = effect === 'curved-top'
      ? `M ${-textWidth/2} 0 Q 0 ${-radius} ${textWidth/2} 0`
      : `M ${-textWidth/2} 0 Q 0 ${radius} ${textWidth/2} 0`;
    
    const path = new Path(pathString, {
      visible: false,        // Hide the path
      stroke: 'transparent', // Make stroke transparent
      fill: 'transparent',   // Make fill transparent
      opacity: 0,            // Set opacity to 0
    });

    // Create new text with path - mark it as textbox type for UI purposes
    const curvedText = new FabricText(text, {
      ...currentProps,
      path: path,
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      hasRotatingPoint: true,
      lockRotation: false,
    });

    canvasRef.current.add(curvedText);
    canvasRef.current.setActiveObject(curvedText);
    canvasRef.current.renderAll();
    setSelectedObject(curvedText);
  };



  const exportDesign = () => {
    if (!canvasRef.current || !printAreaRef.current) return;

    // Temporarily hide print area overlay
    printAreaRef.current.set('opacity', 0);
    canvasRef.current.renderAll();

    // Export canvas as PNG
    const dataURL = canvasRef.current.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2, // 2x resolution
    });

    // Restore print area overlay
    printAreaRef.current.set('opacity', 1);
    canvasRef.current.renderAll();

    // Download
    const link = document.createElement('a');
    link.download = `design-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
  };

  if (!product) {
    return <p>Product not found!</p>;
  }

  if (!product.designer) {
    return <p>This product cannot be customized</p>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Design Studio</h2>

        {/* Variant Selection */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Color</h3>
          <div className="flex flex-wrap gap-2">
            {product.designer.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => handleVariantChange(index)}
                className={`px-4 py-2 rounded border-2 transition ${
                  selectedVariant === index
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {variant.color}
              </button>
            ))}
          </div>
        </div>

        {/* Add Elements */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Add Elements</h3>
          <div className="space-y-2">
            <button
              onClick={addText}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              + Add Text
            </button>
            <button
              onClick={addSticker}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              + Add Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Text Controls */}
        {selectedObject && (selectedObject.type === 'textbox' || selectedObject.type === 'text') && (
          <div className="mb-8 p-4 bg-gray-50 rounded space-y-4">
            <h3 className="font-semibold mb-3">Text Settings</h3>
            
            {/* Text Content Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Text Content</label>
              <textarea
                value={textContent}
                onChange={(e) => updateTextContent(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500 resize-none"
                rows={3}
                placeholder="Enter your text here..."
              />
            </div>
            
            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium mb-2">Font</label>
              <select
                value={fontFamily}
                onChange={(e) => updateFontFamily(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-500"
              >
                {fontOptions.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Fill Color */}
            <div>
              <label className="block text-sm font-medium mb-2">Fill Color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => updateTextColor(e.target.value)}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Font Size: {fontSize}px
              </label>
              <input
                type="range"
                min="20"
                max="120"
                value={fontSize}
                onChange={(e) => updateFontSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Character Spacing */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Letter Spacing: {charSpacing}
              </label>
              <input
                type="range"
                min="-100"
                max="500"
                value={charSpacing}
                onChange={(e) => updateCharSpacing(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* NEW: Rotation Control */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Rotation: {rotation}°
              </label>
              <input
                type="range"
                min="0"
                max="360"
                value={rotation}
                onChange={(e) => updateRotation(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Stroke Width */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Stroke Width: {strokeWidth}px
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={strokeWidth}
                onChange={(e) => updateStrokeWidth(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Stroke Color */}
            {strokeWidth > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Stroke Color</label>
                <input
                  type="color"
                  value={strokeColor}
                  onChange={(e) => updateStrokeColor(e.target.value)}
                  className="w-full h-10 rounded cursor-pointer"
                />
              </div>
            )}

            {/* Shadow Blur */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Shadow Blur: {shadowBlur}px
              </label>
              <input
                type="range"
                min="0"
                max="30"
                value={shadowBlur}
                onChange={(e) => updateShadowBlur(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Text Effect */}
            <div>
              <label className="block text-sm font-medium mb-2">Text Effect</label>
              <div className="space-y-2">
                <button
                  onClick={() => applyCurvedText('none')}
                  className={`w-full px-3 py-2 rounded border-2 transition ${
                    textEffect === 'none'
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => applyCurvedText('curved-top')}
                  className={`w-full px-3 py-2 rounded border-2 transition ${
                    textEffect === 'curved-top'
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Curved (Top)
                </button>
                <button
                  onClick={() => applyCurvedText('curved-bottom')}
                  className={`w-full px-3 py-2 rounded border-2 transition ${
                    textEffect === 'curved-bottom'
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  Curved (Bottom)
                </button>
              </div>
            </div>

            {/* Curve Radius */}
            {textEffect !== 'none' && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Curve Intensity: {curveRadius}
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={curveRadius}
                  onChange={(e) => {
                    setCurveRadius(Number(e.target.value));
                    applyCurvedText(textEffect);
                  }}
                  className="w-full"
                />
              </div>
            )}
          </div>
        )}

        {/* Layer Controls - UPDATED with Duplicate button */}
        {selectedObject && (
          <div className="mb-8">
            <h3 className="font-semibold mb-3">Layers</h3>
            <div className="space-y-2">
              {/* NEW: Duplicate Button */}
              <button
                onClick={duplicateSelected}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                📋 Duplicate
              </button>
              <button
                onClick={bringForward}
                className="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Bring Forward
              </button>
              <button
                onClick={sendBackward}
                className="w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
              >
                Send Backward
              </button>
              <button
                onClick={deleteSelected}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Export */}
        <div>
          <button
            onClick={exportDesign}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold"
          >
            Export Design
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
        <canvas id="designer-canvas" />
      </div>

    </div>
  );
}

