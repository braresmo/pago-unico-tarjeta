const request = require('request');
const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
app = express();
app.use(express.static("public"));
app.use(express.json());


app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/public/index.html`);
})
app.post('/peticion', async function (req, res) {
    let token = req.body.token;
    const resp= await prueba(token);
    console.log(resp)
    res.send(JSON.stringify(resp));
  })

  const prueba = (token) => {
    return new Promise((resolve, reject)=>{
        var options = {
            method: 'POST',
            headers: {
              'Private-Merchant-Id': 'ef672234e4894e0884f659af00be8331', // Replace with your Private merchant id
              'Content-Type': 'application/json'
            },
            url: 'https://api-uat.kushkipagos.com/card/v1/charges', // Test environment
            body: {
              token: token, // Replace with the token you recieved
              amount: {
                subtotalIva: 0,
                subtotalIva0: 149900,
                ice: 0,
                iva: 0,
                currency: "COP"
              },
              metadata: {
                contractID: "157AB"
              },
              contactDetails: {
                documentType: "CC",
                documentNumber: "1009283738",
                email: "test@test.com",
                firstName: "Diego",
                lastName: "Cadena",
                phoneNumber: "+5730162826289"
              },
              orderDetails: {
                siteDomain: "tuebook.com",
                shippingDetails: {
                  name: "Diego Cadena",
                  phone: "+5730162826289",
                  address: "Eloy Alfaro 139 y Catalina Aldaz",
                  city: "Medellín",
                  region: "Antioquia",
                  country: "Colombia",
                  zipCode: "170402"
                },
                billingDetails: {
                name: "Diego Osorio",
                phone: "+593988734644",
                address: "Eloy Alfaro 139 y Catalina Aldaz",
                city: "Medellín",
                region: "Antioquia",
                country: "Colombia",
                zipCode: "170402"
              }
            },
            productDetails: {
              product: [{
                  id: "198952AB",
                  title: "eBook Digital Services",
                  price: 69900,
                  sku: "10101042",
                  quantity: 1
                },
                {
                  id: "198953AB",
                  title: "eBook Virtual Selling",
                  price: 99900,
                  sku: "004834GQ",
                  quantity: 1
                }
              ]
            },
            fullResponse: true
          },
          json: true
        };
        request(options, function (error, response, body) {
          if (error) {
              reject(`Ocurrio un error: error : ${error}`)
          }
          
          resolve(body);
        });
    });
}





// console.log('termino')

app.listen(PORT,() =>{
  console.log(`Ejecutando desde el puerto : ${PORT}`)
});





// var options = {
//     method: 'POST',
//     headers: {
//       'Private-Merchant-Id': 'your-private-merchat-id', // Replace with your Private merchant id
//       'Content-Type': 'application/json'
//     },
//     url: 'https://api-uat.kushkipagos.com/card/v1/charges', // Test environment
//     body: {
//       token: "V0OzRB100000xhxQB8035251pHLBQsq5", // Replace with the token you received
//       amount: {
//         subtotalIva: 0,
//         subtotalIva0: 149900,
//         ice: 0,
//         iva: 0,
//         currency: "COP"
//       },
//       metadata: {
//         contractID: "157AB"
//       },
//       contactDetails: {
//         documentType: "CC",
//         documentNumber: "1009283738",
//         email: "test@test.com",
//         firstName: "Diego",
//         lastName: "Cadena",
//         phoneNumber: "+5730162826289"
//       },
//       orderDetails: {
//         siteDomain: "tuebook.com",
//         shippingDetails: {
//           name: "Diego Cadena",
//           phone: "+5730162826289",
//           address: "Eloy Alfaro 139 y Catalina Aldaz",
//           city: "Medellín",
//           region: "Antioquia",
//           country: "Colombia",
//           zipCode: "170402"
//         },
//         billingDetails: {
//         name: "Diego Osorio",
//         phone: "+593988734644",
//         address: "Eloy Alfaro 139 y Catalina Aldaz",
//         city: "Medellín",
//         region: "Antioquia",
//         country: "Colombia",
//         zipCode: "170402"
//       }
//     },
//     productDetails: {
//       product: [{
//           id: "198952AB",
//           title: "eBook Digital Services",
//           price: 69900,
//           sku: "10101042",
//           quantity: 1
//         },
//         {
//           id: "198953AB",
//           title: "eBook Virtual Selling",
//           price: 99900,
//           sku: "004834GQ",
//           quantity: 1
//         }
//       ]
//     },
//     fullResponse: true
//   },
//   json: true
// };
// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//   console.log(body);
// });