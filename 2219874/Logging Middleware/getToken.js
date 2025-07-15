const axios = require('axios');

(async () => {
  try {
    const response = await axios.post('http://20.244.56.144/evaluation-service/auth', {
      clientID: 'a3cbe95a-c7d7-4a43-b270-042e2e9145f7',
      clientSecret: 'zghnCHrmekEaWDbn',
      accessCode: 'QAhDUr',
      email: 'vanshrajsoam1@gmail.com',
      name: 'vansh raj soam',
      rollNo: '2219874'
    });
    console.log('access_token:', response.data.access_token);
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
})(); 