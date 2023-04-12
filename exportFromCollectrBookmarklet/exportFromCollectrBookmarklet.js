javascript: (() => {
  var collectionId = "ce559747-7449-4b80-93ac-0ac7523c5db1";
  var out = [];
  let xhr1 = new XMLHttpRequest();
  xhr1.responseType = "json";
  xhr1.open(
    "GET",
    `https://9qrtyiwk58.execute-api.us-east-1.amazonaws.com/collections/${collectionId}/products?limit=1000000&filters=3`
  );
  xhr1.onload = function () {
    firstRequest(this.response);
  };
  xhr1.send();

  function firstRequest(json) {
    json["data"].forEach((element) => {
      let xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.open(
        "GET",
        `https://9qrtyiwk58.execute-api.us-east-1.amazonaws.com/collections/${collectionId}/products/${element.product_id}?collectionId=${collectionId}&currency=USD&details=false`
      );
      xhr.onload = function () {
        secondRequest(this.response);
      };
      xhr.send();
    });
  }

  function secondRequest(json) {
    json.data.ungraded_sub_types.forEach((element) => {
      for (let i = 0; i < element.quantity; i++) {
        let newEntry = {
          tcgPlayerId: json.data.product_id.trim(),
          variant: element.product_sub_type.trim(),
          cardName: json.data.product_name.trim(),
          cardNumber: json.data.card_number.trim(),
          expansionName: json.data.catalog_group.trim(),
        };
        out.push(newEntry);
      }
    });
  }
  
  console.log(out);
})();
