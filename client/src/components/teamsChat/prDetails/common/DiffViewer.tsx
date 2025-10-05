import React from "react";

const DiffViewer: React.FC<{ diffHunk: string }> = ({ diffHunk }) => {
    const renderDiffLines = () => {
    const lines = diffHunk.split('\n');
    
    return lines.map((line, index) => {
      if (line.startsWith('@@')) {
        return (
          <div key={index} style={{ 
            backgroundColor: '#f7fafc', 
            color: '#4a5568',
            fontSize: '0.75rem',
            padding: '4px 8px',
            fontFamily: 'monospace'
          }}>
            {line}
          </div>
        );
      }
      
      let backgroundColor = '#f7fafc';
      let textColor = '#4a5568';
      let borderColor = 'transparent';
      let content = line;
      
      if (line.startsWith('-')) {
        backgroundColor = '#fed7d7';
        textColor = '#c53030';
        borderColor = '#fc8181';
        content = line.substring(1);
      } else if (line.startsWith('+')) {
        backgroundColor = '#c6f6d5';
        textColor = '#276749';
        borderColor = '#68d391';
        content = line.substring(1);
      } else if (line.startsWith(' ')) {
        backgroundColor = '#f7fafc';
        textColor = '#4a5568';
        content = line.substring(1);
      }
      
      return (
        <div 
          key={index}
          style={{
            backgroundColor,
            color: textColor,
            borderLeft: `2px solid ${borderColor}`,
            padding: '4px 8px',
            fontFamily: 'monospace',
            fontSize: '0.875rem'
          }}
        >
          {content}
        </div>
      );
    });
  };

  return (
    <div style={{ 
      border: '1px solid #e2e8f0', 
      borderRadius: '6px', 
      overflow: 'hidden',
      fontFamily: 'monospace'
    }}>
      {renderDiffLines()}
    </div>
  );
}

export default DiffViewer;