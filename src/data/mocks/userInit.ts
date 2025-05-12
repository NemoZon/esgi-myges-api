import { ISpeaker } from '../../models/speaker.model';
import { IStudent } from '../../models/student.model';
import { IUser } from '../../models/user.model';
import bcrypt from 'bcrypt';
import userService from '../../services/user.service';
import objectService from '../../services/object.service';
import { getRandomElementFromArray } from '../../helpers/tools';

type UserData = Omit<IUser, '_id' | 'password' | 'roles'> & {
  hashPassword: () => Promise<string>;
};

type SpeakerData = {
  user: UserData;
  speaker: Omit<ISpeaker, '_id' | 'user'>;
};

type StudentData = {
  user: UserData;
  student: Omit<IStudent, '_id' | 'user'>;
};

const admins: UserData[] = [
  {
    email: 'admin@gmail.com',
    hashPassword: () => bcrypt.hash('admin', 3)
  }
];

const speakers: SpeakerData[] = [
  {
    user: {
      email: 'speaker1@gmail.com',
      hashPassword: () => bcrypt.hash('speaker1', 3)
    },
    speaker: {
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=John',
      objects: []
    }
  },
  {
    user: {
      email: 'speaker2@gmail.com',
      hashPassword: () => bcrypt.hash('speaker2', 3)
    },
    speaker: {
      firstName: 'Jane',
      lastName: 'Smith',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Jane',
      objects: []
    }
  },
  {
    user: {
      email: 'speaker3@gmail.com',
      hashPassword: () => bcrypt.hash('speaker3', 3)
    },
    speaker: {
      firstName: 'Peter',
      lastName: 'Parker',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Peter',
      objects: []
    }
  },
  {
    user: {
      email: 'speaker4@gmail.com',
      hashPassword: () => bcrypt.hash('speaker4', 3)
    },
    speaker: {
      firstName: 'Bruce',
      lastName: 'Wayne',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Bruce',
      objects: []
    }
  },
  {
    user: {
      email: 'speaker5@gmail.com',
      hashPassword: () => bcrypt.hash('speaker5', 3)
    },
    speaker: {
      firstName: 'Alice',
      lastName: 'Johnson',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Alice',
      objects: []
    }
  }
];

const students: StudentData[] = [
  {
    user: {
      email: 'student1@gmail.com',
      hashPassword: () => bcrypt.hash('student1', 3)
    },
    student: {
      firstName: 'Harry',
      lastName: 'Potter',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Harry',
      evaluations: [],
      absences: []
    }
  },
  {
    user: {
      email: 'student2@gmail.com',
      hashPassword: () => bcrypt.hash('student2', 3)
    },
    student: {
      firstName: 'Hermione',
      lastName: 'Granger',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Hermione',
      evaluations: [],
      absences: []
    }
  },
  {
    user: {
      email: 'student3@gmail.com',
      hashPassword: () => bcrypt.hash('student3', 3)
    },
    student: {
      firstName: 'Ron',
      lastName: 'Weasley',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Ron',
      evaluations: [],
      absences: []
    }
  },
  {
    user: {
      email: 'student4@gmail.com',
      hashPassword: () => bcrypt.hash('student4', 3)
    },
    student: {
      firstName: 'Luna',
      lastName: 'Lovegood',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Luna',
      evaluations: [],
      absences: []
    }
  },
  {
    user: {
      email: 'student5@gmail.com',
      hashPassword: () => bcrypt.hash('student5', 3)
    },
    student: {
      firstName: 'Luna',
      lastName: 'Lovegood',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Luna',
      evaluations: [],
      absences: []
    }
  },
  {
    user: {
      email: 'student6@gmail.com',
      hashPassword: () => bcrypt.hash('student6', 3)
    },
    student: {
      firstName: 'Neville',
      lastName: 'Longbottom',
      avatar: 'https://api.dicebear.com/9.x/initials/svg?seed=Neville',
      evaluations: [],
      absences: []
    }
  }
];

export default async function userInit() {
  try {
    const objects = await objectService.get();

    // Initialize Admins
    for (const admin of admins) {
      const hashedPassword = await admin.hashPassword();
      try {
        await userService.createAdmin({ ...admin, password: hashedPassword });
      } catch (error) {
        console.log('Error creating admin:', error);
      }
    }

    // Initialize Speakers
    for (const { user, speaker } of speakers) {
      const object = getRandomElementFromArray(
        objects.map((object) => object._id)
      );
      const hashedPassword = await user.hashPassword();
      try {
        await userService.createSpeaker(
          { ...user, password: hashedPassword },
          { ...speaker, objects: object ? [object] : [] }
        );
      } catch (error) {
        console.log('Error creating speaker:', error);
      }
    }

    // Initialize Students
    for (const { user, student } of students) {
      try {
        const hashedPassword = await user.hashPassword();
        await userService.createStudent(
          { ...user, password: hashedPassword },
          student
        );
      } catch (error) {
        console.log('Error creating student:', error);
      }
    }
  } catch (error) {
    console.error('Error initializing user data:', error);
  }
}
