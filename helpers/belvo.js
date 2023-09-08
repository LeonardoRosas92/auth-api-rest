const crearLink = async (nombreBanco) => {
  try {
    const response = await fetch(`${process.env.BELVO_URL}/links/`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: process.env.BELVO_AUTH
      },
      body: JSON.stringify({
        access_mode: 'recurrent',
        institution: nombreBanco,
        username: 'user_valid',
        password: 'pass_valid'
      })
    });
    const { id } = await response.json();
    console.log("Id Belbo "+id);
    return id
  } catch (error) {
    console.log("Error Belbo"+error);
  }
}

module.exports = {
  crearLink
}