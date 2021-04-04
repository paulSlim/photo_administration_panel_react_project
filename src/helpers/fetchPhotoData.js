import request from '../helpers/request';

const fetchPhotoData = () => {
    const { data } = await request.get('/photos');
}

export default fetchPhotoData;