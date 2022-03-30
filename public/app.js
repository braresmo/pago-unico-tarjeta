const kushki = new Kushki({
    merchantId: '8509c8f51c4b46e8a30352f97f1ac064', // Your public merchant id 
    inTestEnvironment: true,
  });

  document.querySelector("#content-payment-test_ok").onclick = test;
  document.querySelector("#content-payment-test_badToken").onclick = test;
  document.querySelector("#content-payment-test_bad").onclick = test;

  let dorime = document.querySelector("#content-payment-test_ok");
  console.log(dorime.value)

const form = document.querySelector("#payment-form");
const tagSuccess = document.querySelector('#content-payment_success')
const main = document.querySelector('#main-content-payment')
form.addEventListener('submit',enviarPeticion,true);
console.log(tagSuccess)

let respuestastring ;

function test(element){
    
    if(element.target.id == "content-payment-test_ok"){
        form.name.value = "Juan Perez";
        form.number.value = "5451951574925480";//
        form.cvc.value = "123";
        form.expiry_month.value = "11"
        form.expiry_uear.value = "22"
    }else if(element.target.id == "content-payment-test_badToken"){
        form.name.value = "Juan Perez";
        form.number.value = "4574441215190335";//
        form.cvc.value = "123";
        form.expiry_month.value = "11"
        form.expiry_uear.value = "22"
    }
    else if(element.target.id == "content-payment-test_bad"){
        form.name.value = "Juan Perez";
        form.number.value = "4349003000047015";//
        form.cvc.value = "123";
        form.expiry_month.value = "11"
        form.expiry_uear.value = "22"
    }else console.log("El id del elemento button no coincide con los criterios")
}

function enviarPeticione(element){
    document.querySelector("#content-payment-infoToken").innerHTML = "Cargando...";
    element.preventDefault();
    tagSuccess.style.display = 'flex';
    main.style.opacity = '0';
}
async function enviarPeticion(element){
    element.preventDefault();
    document.querySelector("#content-payment-infoToken").innerHTML = "Cargando...";

    kushki.requestToken({
        amount: '149900',
        currency: "COP",
        card: {
          name: form.name.value,
          number: form.number.value,
          cvc: form.cvc.value,
          expiryMonth: form.expiry_month.value,
          expiryYear: form.expiry_uear.value
          
        },
      }, async (response) => {
           
        if(response.token){
            let token = {
                    method : 'POST',
                    headers :{
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify({
                        token : response.token
                    })
                }
            console.log(token);
            await fetch('/peticion',token)
            .then(res => res.json())
            .then(data => {
                if(data.code){
                    document.querySelector("#content-payment-infoToken").innerHTML =`<b style="color : red">Hubo un Error en su transaccion.</b><br> 
                    codigo : ${data.code}, <br> 
                    Detalle : ${data.message}, <br> 
                    Comentarios : ${data.details.responseText}`
                }else {
                    document.querySelector("#content-payment_success-code").innerHTML = `{${JSON.stringify(data, null, 2)}}`;
                    tagSuccess.style.display = 'flex';
                    main.style.opacity = '0';
                    console.log(data.code);
                    respuestastring = data;
                }


            })
            .catch(res => console.log(`algo salio mal ${res}`))
        } else {
            // respuestastring = response ;
          console.error('Error: ',response.error, 'Code: ', response.code, 'Message: ',response.message);
          console.log("desde el error");
        }
      });

}

