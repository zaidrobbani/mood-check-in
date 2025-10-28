import {z} from 'zod';

export const moodCheckInSchema = z.object({
    feeling : z.string().nonempty("Please share how you feel — this field is required."),
    moodScore : z.number().min(0).max(100),
})

export type MoodCheckInFormData = z.infer<typeof moodCheckInSchema>;

export type MoodCheckInFormErrors = Partial<Record<keyof MoodCheckInFormData, string>>;