let response = {}


response.ok = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      let ok = {
        status: 'ok',
        response: data
      };
      resolve(ok);
    } catch (error) {
      console.log(error);
      reject(`Error procesando la respuesta. Error: ${error}`);
    }
  })
}

response.okCreate = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      let ok = {
        status: 'ok',
        response: data
      };
      resolve(ok);
    } catch (error) {
      console.log(error);
      reject(`Error procesando la respuesta. Error: ${error}`);
    }
  })
}


response.error = async (payload) => {
  return new Promise((resolve, reject) => {
    try {
      let err = {
        status: 'error',
        response: payload
      };
      resolve(err);
    } catch (error) {
      console.log(error);
      reject(`Error procesando la respuesta. Error: ${error}`);
    }
  })
}

module.exports = response;