"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUser = exports.CreateRandomUser = exports.USERS = void 0;
const faker_1 = require("@faker-js/faker");
const Post_1 = __importDefault(require("../models/Post/Post"));
const User_1 = __importDefault(require("../models/User/User"));
exports.USERS = [];
class CreateRandomUser {
    constructor(username, profile) {
        this.username = username;
        this.profile = profile;
        this.username = username;
        this.profile = profile;
    }
    generate() {
        return {
            username: this.username,
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password(),
            name: faker_1.faker.name.firstName(),
            lastName: faker_1.faker.name.lastName(),
            profile: this.profile,
            posts: {
                media: [{ source: faker_1.faker.image.image(), title: faker_1.faker.lorem.words() }],
                description: faker_1.faker.lorem.paragraph(),
                owner: {
                    name: this.username,
                    profile: this.profile,
                },
                location: faker_1.faker.address.cityName(),
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
exports.CreateRandomUser = CreateRandomUser;
function generateUser() {
    for (let i = 0; i < 50; i++) {
        const newUser = new CreateRandomUser(faker_1.faker.internet.userName(), faker_1.faker.image.avatar());
        const data = newUser.generate();
        const posts = newUser.generatePost();
        const user = new User_1.default(data);
        const post = new Post_1.default(posts);
        user.save().then((res) => {
            //   console.log(res);
        });
        post.save().then((res) => {
            // console.log(res)
        });
    }
}
exports.generateUser = generateUser;
