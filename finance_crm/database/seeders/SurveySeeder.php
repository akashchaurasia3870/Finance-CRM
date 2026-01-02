<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Survey;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use App\Models\User;

class SurveySeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        $statuses = ['draft', 'active', 'paused', 'closed'];
        $questionTypes = ['text', 'textarea', 'radio', 'checkbox', 'dropdown', 'rating'];
        
        for ($i = 1; $i <= 10; $i++) {
            $survey = Survey::create([
                'title' => 'Customer Satisfaction Survey ' . $i,
                'description' => 'Help us improve our services by sharing your feedback.',
                'start_date' => now()->subDays(rand(1, 30)),
                'end_date' => now()->addDays(rand(1, 60)),
                'status' => $statuses[array_rand($statuses)],
                'created_by' => $users->random()->id,
            ]);

            // Create questions for each survey
            for ($j = 1; $j <= rand(3, 6); $j++) {
                $type = $questionTypes[array_rand($questionTypes)];
                
                $question = SurveyQuestion::create([
                    'survey_id' => $survey->id,
                    'question' => $this->getQuestionText($j, $type),
                    'type' => $type,
                    'is_required' => rand(0, 1),
                    'sort_order' => $j,
                    'created_by' => $users->random()->id,
                ]);

                // Create options for choice-based questions
                if (in_array($type, ['radio', 'checkbox', 'dropdown'])) {
                    $options = $this->getOptionsForType($type);
                    foreach ($options as $index => $optionText) {
                        SurveyQuestionOption::create([
                            'question_id' => $question->id,
                            'option_text' => $optionText,
                            'sort_order' => $index + 1,
                            'created_by' => $users->random()->id,
                        ]);
                    }
                }
            }
        }
    }

    private function getQuestionText($number, $type)
    {
        $questions = [
            'text' => [
                'What is your name?',
                'What is your job title?',
                'Which department do you work in?',
            ],
            'textarea' => [
                'Please provide additional comments or suggestions.',
                'What improvements would you like to see?',
                'Describe your overall experience.',
            ],
            'radio' => [
                'How satisfied are you with our service?',
                'Would you recommend us to others?',
                'How likely are you to use our service again?',
            ],
            'checkbox' => [
                'Which features do you use most? (Select all that apply)',
                'What are your main concerns? (Select all that apply)',
                'Which communication methods do you prefer?',
            ],
            'dropdown' => [
                'What is your age group?',
                'How did you hear about us?',
                'What is your primary role?',
            ],
            'rating' => [
                'Rate our customer service (1-5 stars)',
                'Rate the quality of our product (1-10)',
                'How would you rate your overall experience?',
            ],
        ];

        return $questions[$type][array_rand($questions[$type])];
    }

    private function getOptionsForType($type)
    {
        $options = [
            'radio' => ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
            'checkbox' => ['Email', 'Phone', 'SMS', 'In-person', 'Video Call'],
            'dropdown' => ['18-25', '26-35', '36-45', '46-55', '55+'],
        ];

        return $options[$type] ?? [];
    }
}