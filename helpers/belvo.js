const axios = require("axios");
const crearLink = async (nombreBanco) => {
  console.log(nombreBanco);
  console.log(`${process.env.BELVO_URL}/links/`);
  console.log(process.env.BELVO_AUTH);
  // try {
  //   const response = await fetch(`${process.env.BELVO_URL}/links/`, {
  //     method: 'POST',
  //     headers: {
  //       accept: 'application/json',
  //       'content-type': 'application/json',
  //       authorization: process.env.BELVO_AUTH
  //     },
  //     body: JSON.stringify({
  //       access_mode: 'recurrent',
  //       institution: nombreBanco,
  //       username: 'user_valid',
  //       password: 'pass_valid'
  //     })
  //   });
  //   const { id } = await response.json();
  //   console.log("Id Belbo "+id);
  //   return id
  // } catch (error) {
  //   console.log("Error Belbo "+error);
  // }
  try {
    const config = {
      headers : {
        Authorization : process.env.BELVO_AUTH
      }
    }
    const usuario = {
      access_mode: 'recurrent',
      institution: nombreBanco,
      username: 'user_valid',
      password: 'pass_valid'
    }
    const { data } = await axios.post(`${process.env.BELVO_URL}/links/`, usuario , config);
    console.log(data);
    const { id } = data;
    return id;
  } catch (error) {
    console.log("Error Belbo "+error);
  }
}

module.exports = {
  crearLink
}