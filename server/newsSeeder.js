const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

const { sequelize } = require('./config/db');

const News = require('./models/News');

// Connect DB
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to MySQL has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database.');
    });

sequelize
    .sync({
        // force: true
    })
    .then(() => console.log('Data synchronized.'))
    .catch(err => console.log(err));


createNews = async () => {
    const news = [];
    for (let i = 10; i < 100; i++) {
        const id = `1d439af2-ef88-4c4b-be8b-e879bdea${i}4e`;
        const title = `News ${i}`;
        const slug = `news-${i}`;
        const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium consectetur sapien in porttitor. Cras id dapibus est. Pellentesque at libero auctor, pharetra orci in, elementum purus. Aenean ornare dui eu libero hendrerit tincidunt. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur ullamcorper turpis eu lacus tempus scelerisque. Phasellus faucibus tincidunt commodo. Nunc at felis lorem. Aliquam eget eros at nunc posuere commodo in id nunc. Nulla tempor odio feugiat, elementum nisi egestas, ultricies nibh. Sed convallis risus lectus, eu placerat elit blandit molestie.

        Duis nec eros finibus, viverra urna nec, tristique lectus. Ut imperdiet a mauris sit amet scelerisque. In varius eros placerat auctor feugiat. Nulla sem leo, placerat quis eros eu, ornare mollis neque. Nulla vitae facilisis nibh, sed tincidunt risus. Suspendisse neque metus, sollicitudin eu est at, vehicula ornare ante. Morbi et dolor nec risus euismod ornare.
        
        Vivamus scelerisque consequat leo non ultricies. Sed velit magna, accumsan vel ultricies ut, gravida eget dui. Donec fringilla magna tellus, ut dictum massa accumsan vel. Sed nec vehicula risus, nec vehicula orci. In vitae nibh imperdiet, aliquam sem id, ultrices mauris. Cras laoreet ex magna, sit amet vulputate elit cursus a. Nam congue eros a porttitor rhoncus. Curabitur a vehicula tortor. Praesent sed pellentesque sapien. Morbi id massa ut lacus ultrices pellentesque. Phasellus lectus libero, vestibulum maximus sapien id, varius aliquet lacus. Cras ac iaculis odio, sit amet iaculis ante. Nullam quam libero, aliquam finibus facilisis nec, convallis et augue. Ut nec arcu pellentesque, elementum dui eu, dignissim tortor. Nam tincidunt libero pharetra tortor viverra, et varius leo facilisis. Donec accumsan varius est, non dignissim lectus sollicitudin ut.
        
        Praesent at suscipit risus. Curabitur tincidunt tempus magna eu mattis. Mauris mattis ipsum euismod nulla cursus tempor. Nam quis facilisis lectus. Aenean in mollis orci, nec fermentum ex. Pellentesque eu porta diam, et volutpat odio. In tempor orci ligula, ultricies sagittis mi accumsan nec.
        
        Cras pulvinar accumsan lacus, sit amet mollis purus interdum vitae. Vivamus auctor metus nisl, dignissim euismod mauris vehicula sed. Integer magna velit, congue eu libero cursus, consequat hendrerit orci. Proin mi est, molestie a mi vitae, volutpat ornare lorem. Aenean posuere molestie purus, eu dapibus elit pellentesque vitae. Proin non tincidunt dui. Morbi non venenatis elit. Quisque lacus metus, vestibulum quis gravida sit amet, feugiat quis nunc.`

        const singleNews = {
            id: id,
            title: title,
            image: 'no-news-photo.jpg',
            slug: slug,
            content: content,
            authorId: '1d439af2-ef88-4c4b-be8b-e879bdea104e'
        };
        news.push(singleNews);
    }
    return news;
};

const importData = async () => {
    try {
        const news = createNews();
        await News.bulkCreate(news);
        console.log('Data imported...');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

importData();