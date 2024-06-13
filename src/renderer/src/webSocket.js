const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('Connected to WebSocket server');
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received data:', data);
  // Update your frontend with the received data
};

socket.onclose = () => {
  console.log('Disconnected from WebSocket server');
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};