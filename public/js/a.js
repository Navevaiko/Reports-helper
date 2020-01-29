const getHoursDifference = (date1, date2) => {
    let result = "00h00min";
    let diff;

    try {
        diff = (date2.getTime() - date1.getTime()) / 1000 / 60 / 60;
    } catch (error) {
        return result;
    }

    //verificando possivel erro 
    if (!diff && diff != 0 || date1 == "Invalid Date" || date2 == "Invalid Date") {
        return result;
    }

    // tratrar o formato da string de retorno

    if (diff >= 1) {

        let diffStr = diff.toString();

        let array = diffStr.split(".");
        let min = "00";

        if (array.length > 1) {
            min = parseInt(array[1]) * 0.6;
            min = parseInt(min.toString().length == 1 ? `${min}0` : min.toString().substr(0, 2));
        }

        let hours = parseInt(array[0]);

        result = `${hours}h${min}min`
    } else {
        diff *= 60;
        result = `${diff.toFixed(0)}min`
    }

    return result;
};

let date1 = new Date('2019-12-27 7:00:00')
let date2 = new Date('2019-12-27 17:30:00')

console.log(date1)

console.log(getHoursDifference(date1, date2))


