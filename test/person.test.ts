import Person from '../src/person';
import {parsePerson} from '../src/transform';

const HANWOON_RAW = {
  name: 'hanwool',
  age: 38,
  plays: ['guitar']
}

describe('parsePerson', () => {
  let personData;
  beforeEach(() => {
    personData = {
      name: 'hanwool',
      age: 38,
      plays: ['guitar']
    }
  });

  test('person', () => {
    const player: Person = parsePerson(personData);
    expect(player !== undefined);
  });
  
  test('Person must have name field', () => {
    // when
    delete personData.name;
    
    // then
    expect(() => {
      parsePerson(personData);
    }).toThrowError('Name is not defined.');
  });
  
  test('pasePerson should parse name', () => {
    // when
    const hanwool = parsePerson(personData);
  
    // then
    expect(hanwool.name).toBe('hanwool');
  })
  
  test('The name of person should not empty string', () => {
    expect(() => {
      delete personData.age;
      parsePerson(personData);
    })
    .toThrowError("The age is not defined.");
  });
  
  test("Person should have age.", () => {
    // when
    const hanwool = parsePerson(personData);
  
    // then
    expect(hanwool.age).toBe(38);
  });
  
  test('The type of age should be number', () => {
    // when
    expect(() => {
      personData.age = '38'; // string!
      parsePerson(personData);
    })
    .toThrowError("The age should be number but it's a [string].");
  });
  
  test("The age of person should not less than zero", () => {
    // when
    personData.age = -1; // negative

    // then
    expect(() => parsePerson(personData))
    .toThrowError('The age of person should not less than zero but it is -1.');
  });
  
  test('should throw error if plays is not defined.', () => {
    // when
    delete personData.plays;

    // then
    expect(() => parsePerson(personData))
    .toThrowError("The plays should be defined but it is [undefined].");
  });

  test('should parse palys as an string array', () => {
    // when
    const hanwool = parsePerson(personData);

    // then
    expect(hanwool.plays).toEqual(['guitar']);
  });

  test('should parse all element of array not just reference', () => {
    // when
    const hanwool = parsePerson(personData);
    personData.plays[0] = 'piano';

    // then
    expect(hanwool.plays).toEqual(['guitar']);
    expect(hanwool.plays).not.toBe(personData.plays);
  });
});
