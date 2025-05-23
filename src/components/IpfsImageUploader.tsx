// // components/IpfsImageUploader.tsx

// 'use client';

// import React, { useState } from 'react';
// import { Web3Storage } from 'web3.storage';

// const getStorageClient = () => {
//   const token = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;
//   if (!token) throw new Error('Web3.Storage token not found');
//   return new Web3Storage({ token });
// }

// const IpfsImageUploader: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setSelectedFile(file);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return;
//     setUploading(true);

//     try {
//       const client = getStorageClient();
//       const cid = await client.put([selectedFile], {
//         name: selectedFile.name,
//         maxRetries: 3,
//       });

//       const url = `https://ipfs.io/ipfs/${cid}/${selectedFile.name}`;
//       setIpfsUrl(url);
//     } catch (err) {
//       console.error('Upload failed:', err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: 'auto', textAlign: 'center', padding: 20 }}>
//       <h2>Upload Image to IPFS</h2>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <br />
//       <button onClick={handleUpload} disabled={!selectedFile || uploading} style={{ marginTop: 10 }}>
//         {uploading ? 'Uploading...' : 'Upload to IPFS'}
//       </button>
//       {ipfsUrl && (
//         <div style={{ marginTop: 20 }}>
//           <p>Uploaded to:</p>
//           <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">
//             {ipfsUrl}
//           </a>
//           <br />
//           <img src={ipfsUrl} alt="Uploaded" style={{ maxWidth: '100%', marginTop: 10 }} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default IpfsImageUploader;