import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import './FileDrop.scss';

function FileDrop({ onFile, ...props }) {
  const [border, setBorder] = useState('none');

  const handleDrag = borderStyle => e => {
    e.preventDefault();
    setBorder(borderStyle);
  };

  useEffect(() => {
    const onDragOver = handleDrag('solid');
    const onDragLeave = handleDrag('none');
    window.addEventListener('dragover', onDragOver);
    window.addEventListener('dragleave', onDragLeave);
    window.addEventListener('drop', dropHandler);

    return () => {
      window.removeEventListener('dragover', onDragOver);
      window.removeEventListener('dragleave', onDragLeave);
      window.removeEventListener('drop', dropHandler);
    };
  }, []);

  const dropHandler = e => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    setBorder('none');

    if (files != null) {
      onFile(files);
    }
  }

  return (
    <div class="dropzone" style={{ border }} {...props} />
  );
}

export default FileDrop;