import {
  User,
  UserTeams,
} from "../store/dashboard/interfaces";
import { teamLogo } from "../assets";
export const users: User[] =
  [
    {
      id: 1,
      name: "Pepe",
      lastName:
        "Doe",
      email:
        "john@doe.com",
      password:
        "123456",
    },
    {
      id: 2,
      name: "Don Jon",
      lastName:
        "Doe",
      email:
        "don@doe.com",
      password:
        "123456",
    },
  ];

export const teams: UserTeams[] =
  [
    {
      creatorId: 1,
      id: 101,
      name: "John Doe's team 1",
      logo: teamLogo,
    },
    {
      creatorId: 1,
      id: 102,
      name: "John Doe's team 2",
      logo: teamLogo,
    },
  ];

export const ActiveTeam: UserTeams[] =
  [
    {
      creatorId:
        teams[0]
          .creatorId,
      id: teams[0]
        .id,
      name: teams[0]
        .name,
    },
  ];

export interface Members {
  scrumId: number;
  teamId: number;
  name: string;
  email: string;
}

export const TeamMembers: Members[] =
  [
    {
      scrumId: 1,
      teamId: 101,
      name: "Juan",
      email:
        "juan@mail.com",
    },
    {
      scrumId: 1,
      teamId: 101,
      name: "Marta",
      email:
        "Marta@mail.com",
    },
    {
      scrumId: 1,
      teamId: 101,
      name: "Pedro",
      email:
        "pedro@mail.com",
    },
    {
      scrumId: 1,
      teamId: 101,
      name: "Juan",
      email:
        "juan@mail.com",
    },
    {
      scrumId: 1,
      teamId: 101,
      name: "Marta",
      email:
        "Marta@mail.com",
    },
    {
      scrumId: 1,
      teamId: 101,
      name: "Pedro",
      email:
        "pedro@mail.com",
    },
    {
      scrumId: 1,
      teamId: 101,
      name: "Juan",
      email:
        "juan@mail.com",
    },
    {
      scrumId: 1,
      teamId: 101,
      name: "Marta",
      email:
        "Marta@mail.com",
    },
    {
      scrumId: 1,
      teamId: 101,
      name: "Pedro",
      email:
        "pedro@mail.com",
    },
    {
      scrumId: 1,
      teamId: 101,
      name: "Juan",
      email:
        "juan@mail.com",
    },
    {
      scrumId: 1,
      teamId: 101,
      name: "Marta",
      email:
        "Marta@mail.com",
    },
    {
      scrumId: 1,
      teamId: 101,
      name: "Pedro",
      email:
        "pedro@mail.com",
    },
  ];
