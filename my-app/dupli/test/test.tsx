import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// Define types for the file state
interface FileUploadResponse {
  fileUrl: string;
}

const FileUploadComponent: React.FC = () => {
  const [file, setFile] = useState<File | null>(null); // Type for file input
  const [fileUrl, setFileUrl] = useState<string | null>(null); // URL of the uploaded file
  const [errorMessage, setErrorMessage] = useState<string>(''); // Error message

  // Handle file input change, typing the event as ChangeEvent<HTMLInputElement>
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // Handle form submission, typing the event as FormEvent
  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (!file) {
      setErrorMessage('Please select a file to upload');
      return;
    }

    // Create FormData to send file in the request body
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Make POST request to upload the file
      const response = await axios.post<FileUploadResponse>('http://localhost:4000/upload-cf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check response for success
      if (response.status === 200) {
        setFileUrl(response.data.fileUrl); // Save the uploaded file URL
        setErrorMessage('');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error uploading file');
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {fileUrl && (
        <div>
          <h3>File Uploaded Successfully</h3>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            View File
          </a>
          {/* Display the image */}
          <div>
            <img src={fileUrl} alt="Uploaded File" style={{ maxWidth: '100%', marginTop: '10px' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
