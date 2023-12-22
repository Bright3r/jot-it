import { useEffect, useState, useRef } from 'react'

import styles from './styles/Canvas.module.css'

const Canvas = props => {
    const [canvas, setCanvas] = useState(null)
    const [context, setContext] = useState(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [brushSize, setBrushSize] = useState(10)
    const [brushColor, setBrushColor] = useState("black")

    const canvasRef = useRef(null)

    const startDraw = e => {
        context.strokeStyle = brushColor
        context.lineWidth = brushSize

        context.beginPath()
        const mousePos = getMousePos(e)
        context.moveTo(mousePos.x, mousePos.y)
        setIsDrawing(true)
    }

    const draw = e => {
        if (isDrawing) {
            const mousePos = getMousePos(e)
            context.lineTo(mousePos.x, mousePos.y)
            context.stroke()
        }
    }

    const stopDraw = () => {
        context.closePath()
        setIsDrawing(false)
    }

    const clearScreen = () => {
        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    const getMousePos = e => {
        const canvasWindow = canvas.getBoundingClientRect()
        const scaleX = canvas.width / canvasWindow.width
        const scaleY = canvas.height / canvasWindow.height
      
        return {
          x: (e.clientX - canvasWindow.left) * scaleX,
          y: (e.clientY - canvasWindow.top) * scaleY
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current
        setCanvas(canvas)
        setContext(canvas.getContext('2d'))

        canvas.addEventListener('mousedown', startDraw)
        canvas.addEventListener('mousemove', draw)
        canvas.addEventListener('mouseup', stopDraw)
        canvas.addEventListener('mouseout', stopDraw)

        return () => {
            canvas.removeEventListener('mousedown', startDraw);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDraw);
            canvas.removeEventListener('mouseout', stopDraw);
        };

    }, [isDrawing, startDraw, draw, stopDraw])

    return (
        <>
            <canvas 
                ref={canvasRef}
                className={styles.canvas}
                {...props}/>
            <span>Brush Size: </span>
            <input 
                name="Brush Size" 
                type="number"
                value={brushSize}
                onChange={e => setBrushSize(e.target.value)}
            />
            <div>Color:
                <button className={styles.colorOptions} onClick={e => setBrushColor("black")}>Black</button>
                <button className={styles.colorOptions} onClick={e => setBrushColor("red")}>Red</button>
                <button className={styles.colorOptions} onClick={e => setBrushColor("blue")}>Blue</button>
                <button className={styles.colorOptions} onClick={e => setBrushColor("green")}>Green</button>
                <button className={styles.colorOptions} onClick={e => setBrushColor("yellow")}>Yellow</button>
                <button className={styles.colorOptions} onClick={e => setBrushColor("orange")}>Orange</button>
            </div>
            <button className={styles.colorOptions} onClick={e => setBrushColor("white")}>Eraser</button>
            <button className={styles.colorOptions} onClick={e => clearScreen()}>Reset</button>
        </>
    )
}

export default Canvas