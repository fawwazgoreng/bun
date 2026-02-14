import { test, expect, describe, assert } from "vitest";

describe("user testing", () => {
  test("user login testing succesfully", async () => {
    const payload = {
      email: "test123@gmail.com",
      password: "test123",
    };
    const res : any = await fetch(`http://localhost:3000/login`, {
      method: "POST",
      body: JSON.stringify(payload),
    })
      .then((res) => res.json());
    assert.exists(res.token);
  });

  test("user login testing failed", async () => {
    const payload = {
      email: "test@gmail.com",
      password: "test12",
    };
    const res: any = await fetch(`http://localhost:3000/login`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
  
  test('unauthorized', async () => {
    const res : any = await fetch('http://localhost:3000/post').then(data => data.json());
    expect(res.message).toEqual('unauthorized');
  })
  
  test('authorized', async () => {
    const payload = {
      email: "test123@gmail.com",
      password: "test123",
    };
    const token : any = await fetch(`http://localhost:3000/login`, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then((res) => res.json());
    const res: any = await fetch('http://localhost:3000/post', {
      method : "POST",
      headers: {
        Authorization : `Bearer ${token.token}`
      }
    }).then(data => data.json());
    expect(res.message).not.equal('unauthorized');
  })
});
