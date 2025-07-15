const axios = require('axios');

(async () => {
  try {
    const response = await axios.post('http://20.244.56.144/evaluation-service/register', {
      email: 'vanshrajsoam1@gmail.com',
      name: 'vansh raj soam',
      mobileNo: '9368778001',
      githubUsername: 'soamvanshraj31',
      rollNo: '2219874',
      accessCode: 'QAhDUr' // <-- Provided access code
    });
    console.log('clientID:', response.data.clientID);
    console.log('clientSecret:', response.data.clientSecret);
  } catch (error) {
    if (error.response) {
      console.error('Error:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
})(); 