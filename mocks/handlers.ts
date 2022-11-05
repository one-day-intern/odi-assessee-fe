import { rest } from "msw";

export const handlers = [
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/api/token/refresh/`,
    async (req, res, ctx) => {
      if (req) {
        const body = await req.json();
        if (body.refresh && body.refresh === "refreshtoken") {
          return res(
            ctx.json({
              access: "accesstoken",
              refresh: "refreshtoken",
            })
          );
        }
        return res(
          ctx.status(400)
        );
      }
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/api/token/`,
    (req, res, ctx) => {
      if (req)
        return res(
          ctx.json({
            access: "accesstoken",
            refresh: "refreshtoken",
          })
        );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/protected/`,
    (req, res, ctx) => {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (token !== "accesstoken") {
        return res(
          ctx.status(401),
          ctx.json({ message: "Authentication error occured" })
        );
      }

      return res(
        ctx.json({
          message: "Protected route accessed",
        })
      );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/protected/error/`,
    (req, res, ctx) => {
      console.log(req);
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (token !== "accesstoken") {
        return res(
          ctx.status(401),
          ctx.json({ message: "Authentication error occured" })
        );
      }

      return res(
        ctx.json({
          message: "Error protected route accessed",
        }),
        ctx.status(400)
      );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/unprotected/`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "Unprotected route accessed",
        })
      );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/unprotected-error/`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "Error unprotected route accessed",
        }),
        ctx.status(404)
      );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/get-info/`,
    (req, res, ctx) => {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (token !== "accesstoken") {
        return res(
          ctx.status(401),
          ctx.json({ message: "Authentication error occured" })
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          company_id: "cee7f64d-9316-4967-a5a8-770ea40075b8",
          email: "johaneslew@gmail.com",
          company_name: "Tayo Mabok",
          description: "Bus Company",
          address: "Fasilkom UI",
        })
      );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/unprotected-post/`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "Unprotected route posted",
        })
      );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/unprotected-post-error/`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          message: "Error unprotected route posted",
        }),
        ctx.status(400)
      );
    }
  ),
  rest.get(
    `http://localhost:8000/assessment/assessment-event/subscribe/`,
    (req, res, ctx) => {
      const testCase = req.url.searchParams.get("assessment-event-id");

      if (testCase === "serverError") {
        return res(ctx.status(500));
      } else if (testCase === "authError") {
        return res(ctx.status(401));
      }

      return res(
        ctx.status(200),
        ctx.set("Connection", "keep-alive"),
        ctx.set("Content-Type", "text/event-stream"),
        ctx.body(
          `data: ${JSON.stringify({
            id: "test",
            type: "assignment",
            name: "Assignment 3",
            message: "Hello from sse",
          })}\n\n`
        )
      );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/protected-post/`,
    (req, res, ctx) => {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (token !== "accesstoken") {
        return res(
          ctx.status(401),
          ctx.json({ message: "Authentication error occured" })
        );
      }

      return res(
        ctx.json({
          message: "Protected route posted",
        })
      );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/route/protected-post/error/`,
    (req, res, ctx) => {
      const token = req.headers.get("Authorization")?.split(" ")[1];
      if (token !== "accesstoken") {
        return res(
          ctx.status(401),
          ctx.json({ message: "Authentication error occured" })
        );
      }

      return res(
        ctx.json({
          message: "Error protected route posted",
        }),
        ctx.status(400)
      );
    }
  ),
  rest.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/video-conference/rooms/join/assessee/`,
    (req, res, ctx) => {}
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/mock/upload/`,
    async (req, res, ctx) => {
      return res(
        ctx.json({
          message: "file received!",
        }),
        ctx.status(200)
      );
    }
  ),
  rest.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/mock/upload/error/`,
    async (req, res, ctx) => {
      return res(
        ctx.json({
          message: "file upload error",
        }),
        ctx.status(400)
      );
    }
  ),
  rest.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/assessment/assessment-event/`, (req, res, ctx) => {
    return res(
      ctx.json({
        message: "Attempt created"
      }),
      ctx.status(200)
    )
  })
];
