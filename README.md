## Angular - Base state class 🐍

[![npm](https://img.shields.io/npm/dt/ngx-base-state.svg)]()
[![npm](https://img.shields.io/npm/l/ngx-base-state.svg)]()
[![Build status](https://travis-ci.org/Nillcon248/ngx-base-state.svg?branch=master)](https://travis-ci.org/Nillcon248/ngx-base-state)

### Classes have implemented base work with state

# Installation

`npm install ngx-base-state --save`

## Idea
The main idea of this library is remove useless code from class.
Usualy state services violate [DRY pattern](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)  
This library will help to create service with state in 2 lines.

## Properties

### *State properties*

| Name            | Type                       | Description                                                         |
|:----------------|:---------------------------|:--------------------------------------------------------------------|
| data$           | Observable<T \| null>      | state data stream                                                   |
| data            | T                          | state data                                                          |

## Methods

### *ObjectState*

| Name            | Arguments                  | Description                                                         |
|:----------------|:---------------------------|:--------------------------------------------------------------------|
| set             | value: T (generic type)    | set new value for state                                             |
| clear           |                            | clear value for state                                               |

### *ArrayState*

| Name            | Arguments                   | Description                                                            |
|:----------------|:----------------------------|:-----------------------------------------------------------------------|
| set             | value: T[]                  | set new array for state                                                |
| addItem         | item: T                     | push new item to array                                                 |
| removeItem      | item: T                     | remove item from array                                                 |
| updateItem      | itemToUpdate: T             | update item in array                                                   |
| compareItems    | firstItem: T, secondItem: T | method that needs implementation, it used for comparing items in array |

## Example with ObjectState
*user-state.service.ts*
```js
import { ObjectState } from 'ngx-base-state';

@Injectable({
  providedIn: 'root'
})
class UserStateService extands ObjectState<User> {}
```

*user.component.ts*
```js
import { UserStateService } from './user-state.service';

@Component(/* some configuration */)
class UserComponent implements OnInit {
  constructor(private userStateService: UserStateService) {}

  ngOnInit() {
    this.userStateService.data$
      .subscribe(console.log);
    // Output:
    // null
    // { name: 'Nillcon', id: 248 }

    this.changeUser();
  }

  changeUser() {
    this.userStateService.set({
      name: 'Nillcon',
      id: 248
    })
  }
}
```

## Example with ArrayState
*user-array-state.service.ts*
```js
import { ObjectState } from 'ngx-base-state';

@Injectable({
  providedIn: 'root'
})
class UserArrayStateService extands ArrayState<User> {
    constructor() {
        super([]); // Here you can set initial data.
    }
    compareItems(firstUser: User, secondUser: User): boolean {
        return firstUser.id === secondUser.id;
    }
}
```

```js
import { UserArrayStateService } from './user-state.service';

@Component(/* some configuration */)
class UserTableComponent implements OnInit {
  constructor(private userArrayStateService: UserArrayStateService) {}

  ngOnInit() {
    this.userArrayStateService.data$
      .subscribe(console.log);
    // Output:
    // []
    // [{ name: 'Nillcon', id: 248 }, { name: 'noname', id: 1 }] #1
    // [{ name: 'New name', id: 248 }, { name: 'noname', id: 1 }] #2
    // [{ name: 'New name', id: 248 }] #3
    // [{ name: 'New name', id: 248 }, { name: 'John Doe', id: 2 }] #4

    this.setUserArray(); // #1
    this.updateUser() // #2
    this.removeUser(); // #3
    this.addUser(); // #4
  }

  setUserArray() {
    this.userStateService.set([
      {
        name: 'Nillcon',
        id: 248
      },
      {
        name: 'noname',
        id: 1
      }
    ]);
  }

  updateUser() {
    const user = this.userStateService.data[0]; // { name: 'Nillcon', id: 248 }
    user.name = 'New name';

    this.userStateService.updateItem(user);
  }

  removeUser() {
    const user = this.userStateService.data[1]; // { name: 'noname', id: 1 }

    this.userStateService.removeItem(removeItem);
  }

  addUser() {
    this.userStateService.addItem({
      name: 'John Doe',
      id: 2
    });
  }
}
```
