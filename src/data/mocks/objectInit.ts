import objectModel from '../../models/object.model';
import objectService from '../../services/object.service';

const objects = [
  {
    title: 'Devops',
    logo: 'https://www.weodeo.com/wp-content/uploads/2024/03/devops.webp'
  },
  {
    title: 'Data Science',
    logo: 'https://www.mygreatlearning.com/blog/wp-content/uploads/2019/09/What-is-data-science-2.jpg'
  },
  {
    title: 'Web Development',
    logo: 'https://www.hubspot.com/hubfs/web-development.webp'
  },
  {
    title: 'Mobile Development',
    logo: 'https://externlabs.com/blogs/wp-content/uploads/2022/04/b2.jpg'
  },
  {
    title: 'Cloud Computing',
    logo: 'https://cdn.mos.cms.futurecdn.net/pL5rBKGq88cnoqgdJgCXGS.jpg'
  },
  {
    title: 'Cybersecurity',
    logo: 'https://www.theforage.com/blog/wp-content/uploads/2022/12/what-is-cybersecurity-1024x631.jpg'
  },
  {
    title: 'Machine Learning',
    logo: 'https://techblog.smc.it/static/c5256a11117134b1d5f3bd35c479db40/a41d1/ml.jpg'
  },
  {
    title: 'Game Development',
    logo: 'https://careertraining.ed2go.com/common/images/1/16894/game-designer-video-game-developer.jpg'
  },
  {
    title: 'Digital Marketing',
    logo: 'https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/PublishingImages/blog/posts/digital-marketing-skills.jpg&w=1200&h=630'
  },
  {
    title: 'UI/UX Design',
    logo: 'https://www.mydigitalschool.com/sites/default/files/styles/actu_detail/public/2023-12/UX%20UI.jpg.webp?itok=Z29LHfNF'
  }
];

export default async function objectInit() {
  try {
    await Promise.all(
      objects.map(async (object) => {
        const existingObject = await objectModel.findOne({
          title: object.title
        });
        if (existingObject) {
          console.log(
            `Object ${object.title} already exists, skipping initialization.`
          );
          return;
        }
        await objectService.create(object);
      })
    );
    console.log('Objects initialized.');
  } catch (error) {
    console.error('Error initializing objects:', error);
  }
}
