import faker from "faker";
import fs from "fs";
const generateImageData = (number) => {
    const images = [];
    while (number >= 0) {
        images.push({
            title: faker.random.words(),
            tags: faker.lorem.words(),
            picture: faker.image.image(),
            position: faker.datatype.number({ min: 0, max: 1000 })
        });
        number--;
    }
    return images;
};
fs.writeFileSync(
    "./db.json",
    JSON.stringify({data:generateImageData(3000000) })
);