function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

export function generateBanksoalCode() {
   let id = makeid(3)
   let d = new Date();
   let yea = d.getFullYear();

   return `BKSL-${id}-${yea}`
}

export function generateMatpelCode() {
   let id1 = makeid(2)
   let id2 = makeid(3)

   return `MTPL-${id1}-${id2}`
}
