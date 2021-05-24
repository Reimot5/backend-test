const faker = require('faker')

module.exports = (() => {
    return {
        calcularTiempoEntrega() {
            let ranges = [
                {
                    range: 1,
                    distance: 100,
                    delivery_time: 0
                },
                {
                    range: 2,
                    distance: 200,
                    delivery_time: 1
                }
            ]
            let time
            for (let i = 2; i < 20; i++) {
                if (ranges.length > 2) {
                    time = (ranges[i - 1].delivery_time + ranges[i - 2].delivery_time)
                }
                ranges[i] = {
                    range: i + 1,
                    distance: (ranges[i-1].distance + 100),
                    delivery_time: time || 1
                }
            }
            console.log(ranges)
            let distance = faker.datatype.number({ min: 0, max: 2000 })
            console.log(distance)
            let index = ranges.findIndex(x => x.distance > distance)
            console.log(index)
            let result = {
                "Distancia a destino del paquete": `${distance} km`,
                "Tiempo de Entrega": `${ranges[index].delivery_time} dias`,
            }
            return result
        },
    }
})();
