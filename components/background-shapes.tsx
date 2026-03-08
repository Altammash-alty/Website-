export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="2">
          <animate attributeName="y2" values="100%;0%;100%" dur="20s" repeatCount="indefinite" />
        </line>
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(245, 158, 246, 0.3)" strokeWidth="2">
          <animate attributeName="x2" values="0;100%;0" dur="25s" repeatCount="indefinite" />
        </line>
      </svg>
    </div>
  )
}

