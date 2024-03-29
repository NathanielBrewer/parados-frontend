import React, { useState } from 'react';
import '../App.css';
import { toast, Id } from 'react-toastify';
import { BackendCommunicationClient } from '../common/backendCommunicationClient';

function TextOperations() {
  const backendCommunicationClient = BackendCommunicationClient.getInstance();

  const [text, setText] = useState('');
  const [submittedIds, setSubmittedIds] = useState<string[]>([]);

  /**
   * @description Handle user click add text and call BackendCommunicationClient.instance.postText with text value
   */
  async function handleAddText(): Promise<void> {
    if (text === '') {
      toast.error('Please enter text first');
      return;
    }
    const toastId: Id = toast.loading('Adding text');
    try {
      const result = await backendCommunicationClient.postText(text);
      if(result.success) {
        setSubmittedIds([...submittedIds, result.data!.id]);
        setText('');
        toast.dismiss(toastId);
        toast.success(result.message);
      } else {
        toast.dismiss(toastId);
        toast.error(result.message);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error((error as Error).message);
    }
  };
  
  /**
   * @description Handle user click on fetch button for a text id. Display text when retrieved from backend
   */
  async function handleFetchText(id: string): Promise<void> {
    const toastId: Id = toast.loading('Getting text');
    try {
      const result = await backendCommunicationClient.getText(id);
      if(result.success) {
        toast.dismiss(toastId);
        toast.success(`Text for ID ${id}: ${result.data!.text}`);
      } else {
        toast.dismiss(toastId);
        toast.error(result.message);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error((error as Error).message);
    }
  };

  return (
    <section className="section">
      <h2>Text operations</h2>
      <p>Instructions:</p>
      <ul>
        <li>Enter text and click <b>Add</b> to add text to the Firestore Database</li>
        <li>Once your text has been added, its ID will be added to the list of available texts</li>
        <li>Click on any ID's <b>Get text</b> button to retrieve it from the Firestore Database and display its value</li>
      </ul>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleAddText}>Add</button>
      <p>Available text IDs:</p>
      <ul>
        {submittedIds.map((id) => (
          <li key={id}>
            <b>{id}</b> <button onClick={() => handleFetchText(id)}>Get text</button>
          </li>
        ))}
      </ul>
    </section>
  );
};
  
export default TextOperations;