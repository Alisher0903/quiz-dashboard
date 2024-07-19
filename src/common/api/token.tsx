export const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
}

export const imgConfig = {
  headers: {
    'multipart/type': 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
}