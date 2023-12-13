import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';

const googleBookUrl = 'https://www.googleapis.com/books/v1';

export const getUserBookShelf = async shelfNumber => {
  const tokens = await GoogleSignin.getTokens();

  try {
    if (!tokens) {
      throw new Error('User not authenticated.');
    }

    const res = await axios.get(
      `${googleBookUrl}/mylibrary/bookshelves/${shelfNumber}/volumes`,
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
        params: {
          startIndex: 0,
          maxResults: 100,
        },
      },
    );

    let data = res.data;
    return data;
  } catch (err) {
    console.log('Error: ', err.response.data.error);
    return {success: false, msg: err.message};
  }
};

export const bookSearchByName = async name => {
  const tokens = await GoogleSignin.getTokens();

  try {
    if (!tokens) {
      throw new Error('User not authenticated.');
    }
    const res = await axios.get(
      `${googleBookUrl}/volumes?q=intitle:${name}`,
      {},
      {
        Authorization: `Bearer ${tokens.accessToken}`,
        'Content-Type': 'application/json',
      },
    );
    let data = res.data;

    return data;
  } catch (err) {
    console.log('Error: ', err);
    return {success: false, msg: err.message};
  }
};

export const addBookToShelf = async (shelf, id) => {
  const tokens = await GoogleSignin.getTokens();

  try {
    if (!tokens) {
      throw new Error('User not authenticated.');
    }

    const res = await axios.post(
      `${googleBookUrl}/mylibrary/bookshelves/${shelf}/addVolume?volumeId=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(res.status);

    return res.status;
  } catch (error) {
    console.log(error.response.data.error);
    return {success: false, msg: error.message};
  }
};

export const removeBookFromShelf = async (shelf, id) => {
  const tokens = await GoogleSignin.getTokens();

  try {
    if (!tokens) {
      throw new Error('User not authenticated.');
    }

    const res = await axios.post(
      `${googleBookUrl}/mylibrary/bookshelves/${shelf}/removeVolume?volumeId=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(res.status);

    return res.status;
  } catch (error) {
    console.log(error.response.data.error);
    return {success: false, msg: error.message};
  }
};
