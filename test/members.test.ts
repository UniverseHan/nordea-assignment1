import {parseMembers} from '../src/transform';

describe('parseMembers()', () => {

  let membersData;
  beforeEach(() => {
    membersData = {
      current: [
          {name: 'Sascha', age: 59, plays: ['vocals', 'synth', 'guitar', 'bass']},
          {name: 'Lucia', age: 49, plays: ['vocals', 'synth']},
          {name: 'Jules', age: 53, plays: ['guitar', 'bass', 'synth']},
          {name: 'Steve', age: 55, plays: ['guitar']}
      ],
      past: [
          {name: 'Raymond', age: 57, plays: ['vocals', 'synth']},
          {name: 'En', age: 52, plays: ['vocals', 'drums', 'guitar', 'synth']},
          {name: 'Gunter', age: 57, plays: ['guitar', 'synth']}
      ]
    };
  });

  test('should throw for no current property', () => {
    // when 
    delete membersData.current;

    // then
    expect(() => {
      parseMembers(membersData);
    })
    .toThrowError("There is no current property.");
  });

  test('should copy current', () => {
    const members = parseMembers(membersData);

    expect(members.current).toEqual(membersData.current);
    expect(members.current).not.toBe(membersData.current);
    expect(members.current[0]).not.toBe(membersData.current[0]);
  })

  test('should throw if there is no past property', () => {
    // when 
    delete membersData.past;

    // then
    expect(() => {
      parseMembers(membersData);
    })
    .toThrowError("There is no past property.");
  });

  test('should copy past', () => {
    const members = parseMembers(membersData);

    expect(members.past).toEqual(membersData.past);
    expect(members.past).not.toBe(membersData.past);
    expect(members.past[0]).not.toBe(membersData.past[0]);
  });

  describe('for all', () => {
    test("should add all names of members", () => {
      membersData.current = [membersData.current[0]];
      membersData.past = [membersData.past[0], membersData.past[2]];
      const members = parseMembers(membersData);

      expect(members.all).toEqual(['sascha', 'gunter', 'raymond']);
    });
  });
});