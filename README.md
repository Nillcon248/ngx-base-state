## Angular - Base state class 🐍

[![npm](https://img.shields.io/npm/dt/ngx-base-state.svg)]()
[![npm](https://img.shields.io/npm/l/ngx-base-state.svg)]()
[![Build status](https://travis-ci.org/Nillcon248/ngx-base-state.svg?branch=master)](https://travis-ci.org/Nillcon248/ngx-base-state)

### Classes have implemented base work with state

# Idea
The main idea of this library is remove useless code from class.
Usually state services violate [DRY pattern](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)  
This library will help to create service with state in 2 lines.

# Installation

`npm install ngx-base-state --save`

**OPTIONAL: If you want to use Devtools to explore your state via Chrome Extension:**

### In your AppModule

``` typescript
import {
    NgxBaseStateDevtoolsModule,
    NgxBaseStateDevtoolsConfig,
    NGX_BASE_STATE_DEVTOOLS_CONFIG
} from 'ngx-base-state';
import { environment } from 'src/environments/environment'; 

@NgModule({
    imports: [NgxBaseStateDevtoolsModule],
    providers: [
        {
            provide: NGX_BASE_STATE_DEVTOOLS_CONFIG,
            useValue: new NgxBaseStateDevtoolsConfig({
                isEnabled: !environment.production // Devtools will not work in production
            })
        }
    ]
})
export class AppModule {}
```

## Chrome Extension

This tool allows you to see data in your states based on ngx-base-state.

- Install `ngx-base-state` extension from [Chrome WebStore](https://chrome.google.com/webstore/category/extensions);
- Open tab with your Application using ngx-base-state;
- Press F12 to open Devtools;
- Choose ngx-base-state panel in devtools;

Main page will contain list of all your states.
Click to some state and will opened "details page" with state changes history.

## List of States

[![List Page](/projects/ngx-base-state-extension/src/assets/images/extension-list-page.png)]()

## Details of concrete State

[![List Page](/projects/ngx-base-state-extension/src/assets/images/extension-details-page.png)]()

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
class UserStateService extends ObjectState<User> {}
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
import { ArrayState } from 'ngx-base-state';

@Injectable({
  providedIn: 'root'
})
class UserArrayStateService extends ArrayState<User> {
    constructor() {
        super([]); // Here you can set initial data.
    }

    getItemId (user: User): number {
      return user.id;
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

    this.setUserArray();  // [{ name: 'Nillcon', id: 248 }, { name: 'noname', id: 1 }]
    this.updateUser()  // [{ name: 'New name', id: 248 }, { name: 'noname', id: 1 }]
    this.removeUser(); // [{ name: 'New name', id: 248 }]
    this.addUser(); // [{ name: 'New name', id: 248 }, { name: 'John Doe', id: 2 }]
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
    this.userStateService.pushItem({
      name: 'John Doe',
      id: 2
    });
  }
}
```
