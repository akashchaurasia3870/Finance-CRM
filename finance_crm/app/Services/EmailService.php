<?php

namespace App\Services;

use App\Repositories\EmailRepository;
use Illuminate\Support\Facades\Auth;

class EmailService extends BaseService
{
    public function __construct(EmailRepository $repository)
    {
        parent::__construct($repository);
    }

    public function createNewRecord(array $data): object
    {
        if (Auth::check()) {
            $data['created_by'] = Auth::id();
        }
        
        $data['status'] = $data['status'] ?? 'draft';
        $data['retry_count'] = $data['retry_count'] ?? 0;
        
        return $this->repository->add($data);
    }

    public function updateRecord(int $id, array $data): bool
    {
        if (isset($data['status']) && $data['status'] === 'sent' && !isset($data['sent_at'])) {
            $data['sent_at'] = now();
        }
        
        return (bool) $this->repository->edit($id, $data);
    }

    public function getEmailsByStatus($status)
    {
        return $this->repository->findByStatus($status);
    }

    public function getEmailsByTemplate($templateId)
    {
        return $this->repository->findByTemplate($templateId);
    }

    public function getSentEmails()
    {
        return $this->repository->findSentEmails();
    }

    public function getFailedEmails()
    {
        return $this->repository->findFailedEmails();
    }
}