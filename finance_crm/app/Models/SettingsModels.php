<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IntegrationSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'integration_name',
        'enabled',
        'api_keys',
        'configuration',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'enabled' => 'boolean',
            'api_keys' => 'array',
            'configuration' => 'array',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}

// DataManagementSettings Model
class DataManagementSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'import_configuration',
        'export_permissions',
        'data_retention_days',
        'soft_delete_enabled',
        'backup_configuration',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'import_configuration' => 'array',
            'export_permissions' => 'array',
            'soft_delete_enabled' => 'boolean',
            'backup_configuration' => 'array',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}

// AuditSettings Model
class AuditSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity_logging',
        'log_retention_days',
        'tracked_actions',
        'export_logs_enabled',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'activity_logging' => 'boolean',
            'export_logs_enabled' => 'boolean',
            'tracked_actions' => 'array',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}

// LocalizationSettings Model
class LocalizationSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'default_language',
        'currency',
        'number_format',
        'date_format',
        'time_format',
        'multi_language_enabled',
        'available_languages',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'multi_language_enabled' => 'boolean',
            'available_languages' => 'array',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}

// BrandingSettings Model
class BrandingSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'primary_color',
        'secondary_color',
        'accent_color',
        'font_family',
        'font_size',
        'font_weight',
        'login_background',
        'dashboard_widgets',
        'ui_features',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'dashboard_widgets' => 'array',
            'ui_features' => 'array',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}

// SystemBehaviorSettings Model
class SystemBehaviorSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'default_landing_page',
        'record_ownership_rules',
        'auto_assignment_rules',
        'duplicate_detection_rules',
        'data_validation_rules',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'record_ownership_rules' => 'array',
            'auto_assignment_rules' => 'array',
            'duplicate_detection_rules' => 'array',
            'data_validation_rules' => 'array',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}

// ComplianceSettings Model
class ComplianceSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'gdpr_enabled',
        'consent_management',
        'data_access_approvals',
        'legal_disclaimer',
        'privacy_settings',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'gdpr_enabled' => 'boolean',
            'consent_management' => 'boolean',
            'data_access_approvals' => 'array',
            'privacy_settings' => 'array',
        ];
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}