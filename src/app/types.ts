import { InferSelectModel } from "drizzle-orm";
import { advocates as advocatesTable } from "../db/schema";

// InferModel was deprecated in 2022, so using InferSelectModel
// source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v0283#-added-tableinferselect--table_inferselect-and-tableinferinsert--table_inferinsert-for-more-convenient-table-model-type-inference
// In practice, this type sharing might need a different mechanism, like a protobuf schema repo, or a GQL schema, or maybe
// Drizzle has someway to export types to other applications? I didn't have time to look into that.
export type Advocate = InferSelectModel<typeof advocatesTable>;
