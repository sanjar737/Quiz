import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-f96f3.firebaseio.com/'
})