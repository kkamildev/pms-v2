

const calculateAreaData = (obj, taxDistrict, agriculturalTax, forestTax) => {
    let converter = null;
    if(taxDistrict && obj.groundClass.tax == "rolny") {
        converter = obj.groundClass.converters.find((obj) => obj.taxDistrict == taxDistrict).converter;
    }
    const data = {tax:0, calculateArea:0};
    if(obj.groundClass.tax == "rolny") {
        if(taxDistrict) {
            data.converter = converter;
            data.calculateArea = converter * obj.area;
            if(!obj.groundClass.released) {
                if(agriculturalTax) {
                    data.tax = agriculturalTax * converter * obj.area;
                }
            }
        }
    }
    if(obj.groundClass.tax == "lesny") {
        data.tax = forestTax * obj.area;
    }
    return data;
}

export default calculateAreaData;