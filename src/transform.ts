import Person from './person';
import Members from './members';
import Plays from './plays';
import Band from './band';

export function parsePerson(person: any): Person {
  if (!person.name) {
    throw Error("Name is not defined.");
  }
  const name: string = person.name;

  if (!person.age) {
    throw Error('The age is not defined.');
  }

  if (typeof person.age !== 'number') {
    throw Error(`The age should be number but it's a [${typeof person.age}].`);
  }

  if (person.age < 0) {
    throw Error(`The age of person should not less than zero but it is ${person.age}.`);
  }
  const age = person.age;

  if (!person.plays) {
    throw Error(`The plays should be defined but it is [${person.plays}].`);
  }

  return {
    name,
    age,
    plays: [...person.plays]
  }
}

export function parseMembers(members): Members {
  if (!members.current) {
    throw Error("There is no current property.");
  }
  const current = members.current.map(p => parsePerson(p));

  if (!members.past) {
    throw Error("There is no past property.");
  }
  const past = members.past.map(p => parsePerson(p));


  const allMembers: Person[] = [...members.current, ...members.past];
  allMembers.sort((a, b) => {
    if (a.age !== b.age) {
      return b.age - a.age;
    } else {
      return (a.name < b.name) ? -1 : 1;
    }
  });

  return {
    current,
    past,
    all: allMembers.map(m => m.name.toLowerCase())
  }
}

function getPlays(members: Members): Plays {
  const plays: Plays = {
    guitar: [],
    synth: [],
    drums: [],
    bass: [],
    vocals: []
  };

  members.current.forEach(member => {
    for(let play of member.plays) {
      plays[play].push(member.name.toLowerCase())
    }
  });

  members.past.forEach(member => {
    for(let play of member.plays) {
      plays[play].push(member.name.toLowerCase())
    }
  });
  return plays;
}

export function parseBand(data): Band {
  if (!data.members) {
    throw Error("member is not defined.");
  }
  const members: Members = parseMembers(data.members);
  const plays: Plays = getPlays(members);
  return {
    members,
    plays
  }
}