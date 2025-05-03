/**
 * Object Generation
 *
 * @see https://ai-sdk.dev/docs/ai-sdk-ui/object-generation
 */

"use client";

import { notificationSchema } from "@/lib/ai/object-generation/schema";
import { experimental_useObject as useObject } from "@ai-sdk/react";

export default function ObjectGenerationNotification() {
  const { isLoading, stop, error, object, submit } = useObject({
    api: "/api/v1/object-generation/notification",
    schema: notificationSchema,
    onFinish({ object, error }) {
      // typed object, undefined if schema validation fails:
      console.log("Object generation completed:", object);

      // error, undefined if schema validation succeeds:
      console.log("Schema validation error:", error);
    },
    onError(error) {
      // error during fetch request:
      console.error("An error occurred:", error);
    },
  });

  return (
    <div>
      {isLoading && (
        <button type="button" onClick={() => stop()}>
          Stop{" "}
        </button>
      )}

      {error && <div>An error occurred.</div>}

      <button onClick={() => submit("Messages during finals week.")}>
        Generate notifications
      </button>

      {object?.notifications?.map((notification, index) => (
        <div key={index}>
          <p>{notification?.name}</p>
          <p>{notification?.message}</p>
        </div>
      ))}
    </div>
  );
}
