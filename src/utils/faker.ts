import { faker } from "@faker-js/faker";
import Post from "../models/Post/Post";
import User from "../models/User/User";

interface User {
  username: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  profile: string;
  posts: any;
  followings: any[];
  followers: any[];
}

export const USERS: User[] = [];

export class CreateRandomUser {
  constructor(public username: string, public profile: string) {
    this.username = username;
    this.profile = profile;
  }

  generate(): User {
    return {
      username: this.username,
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      profile: this.profile,
      posts: {
        media: [{ source: faker.image.image(), title: faker.lorem.words() }],
        description: faker.lorem.paragraph(),
        owner: {
          name: this.username,
          profile: this.profile,
        },
        location: faker.address.cityName(),
        like: [],
        comment: [],
      },
      followings: [],
      followers: [],
    };
  }

  generatePost() {
    return this.generate().posts;
  }
}

export function generateUser() {
  for (let i = 0; i < 50; i++) {
    const newUser = new CreateRandomUser(
      faker.internet.userName(),
      faker.image.avatar()
    );
    const data = newUser.generate();
    const posts = newUser.generatePost();

    const user = new User(data);
    const post = new Post(posts);
    user.save().then((res: any) => {
      //   console.log(res);
    });
    post.save().then((res: any) => {
      // console.log(res)
    });
  }
}
