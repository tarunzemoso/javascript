function getdata(uid) {
    console.log("Fetched the data!")
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("skc@gmail.com");
      }, 4000);
    });
  }
   
  async function asyncFunctionCall() {
    console.log('start');
    const email = await getdata("skc");
    console.log("Email id of the user id is: " + email);
    console.log("end")
  }
  asyncFunctionCall();