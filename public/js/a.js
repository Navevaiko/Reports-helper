const string = '{ "address": null, "attachments": [], "badges": { "attachmentsByType": { "trello": { "board": 0, "card": 0 } }, "location": false, "votes": 0, "viewingMemberVoted": false, "subscribed": false, "fogbugz": "", "checkItems": 0, "checkItemsChecked": 0, "comments": 0, "attachments": 0, "description": false, "due": null, "dueComplete": false }, "closed": false, "coordinates": null, "cover": null, "customFieldItems": [], "dateLastActivity": "2020-01-29T10:36:57.438Z", "desc": "", "due": null, "dueComplete": false, "id": "5e3160499f14433b37b8a32b", "idList": "5defa5b698177e747b20c304", "idShort": 17, "labels": [{ "id": "5defa5b68bdee58e0df659b8", "name": "IPEM", "color": "yellow" }, { "id": "5e0615de56849c52ba9ff9ab", "name": "Alta prioridade", "color": "red" }], "locationName": null, "members": [{ "id": "5beac754a6ce7a3ee807d916", "fullName": "Lucas Santos", "username": "lucassantos386", "initials": "LS", "avatar": "https://trello-avatars.s3.amazonaws.com/20ef1efbb9e527baae29b64f319d3fc7/170.png" }], "name": "Verificar erros das planilhas", "pos": 65535, "shortLink": "lUuCBOk3", "url": "https://trello.com/c/lUuCBOk3/17-verificar-erros-das-planilhas" }'

const obj = JSON.parse(string);
console.log(obj.url);

// console.log({
//     oi: 'okeae'
// });

