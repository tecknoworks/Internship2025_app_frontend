import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Upload,
  FileText,
  Shield,
  CheckCircle2,
  Scan,
  Layout,
  FileStack,
  Table2,
  Award,
  GraduationCap,
  Briefcase,
  Code,
  Cloud,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Progress } from "./ui/progress";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
}

export function CVProcessingContent() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    files.forEach((file) => {
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type", {
          description: `${file.name} is not a supported format. Please upload PDF, DOC, DOCX, or TXT files.`,
        });
        return;
      }

      if (file.size > maxSize) {
        toast.error("File too large", {
          description: `${file.name} exceeds the 10MB limit.`,
        });
        return;
      }

      const newFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading",
        progress: 0,
      };

      setUploadedFiles((prev) => [...prev, newFile]);

      // Simulate upload progress
      simulateUpload(file.name);

      toast.success("File uploaded", {
        description: `${file.name} is being processed...`,
      });
    });
  };

  const simulateUpload = (fileName: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.name === fileName
            ? {
                ...file,
                progress,
                status: progress < 50 ? "uploading" : progress < 100 ? "processing" : "completed",
              }
            : file
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
        toast.success("Processing complete", {
          description: `${fileName} has been processed successfully.`,
        });
      }
    }, 300);
  };

  const removeFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const processingFeatures = [
    {
      icon: Scan,
      title: "OCR Technology",
      description: "Reads scanned documents and image-based PDFs with high accuracy",
      color: "text-[#2563eb]",
    },
    {
      icon: Layout,
      title: "Structure Preservation",
      description: "Maintains document formatting including headings and bullet points",
      color: "text-[#7c3aed]",
    },
    {
      icon: FileStack,
      title: "Multi-page Support",
      description: "Processes documents of any length efficiently",
      color: "text-[#f97316]",
    },
    {
      icon: Table2,
      title: "Advanced Parsing",
      description: "Extracts tables, lists, and complex layouts accurately",
      color: "text-[#059669]",
    },
  ];

  const extractionFeatures = [
    {
      icon: Code,
      title: "Skills & Technologies",
      description: "Programming languages, frameworks, tools, and software",
      color: "text-blue-600",
    },
    {
      icon: Award,
      title: "Certifications",
      description: "Professional certifications and qualifications",
      color: "text-purple-600",
    },
    {
      icon: GraduationCap,
      title: "Education",
      description: "Degrees, courses, and academic achievements",
      color: "text-pink-600",
    },
    {
      icon: Briefcase,
      title: "Experience & Projects",
      description: "Work history, projects, and notable achievements",
      color: "text-orange-600",
    },
  ];

  const sampleExtractedData = [
    { category: "Technical Skills", items: ["React", "TypeScript", "Node.js", "Python", "SQL"] },
    { category: "Certifications", items: ["AWS Certified Developer", "PMP", "Scrum Master"] },
    { category: "Education", items: ["B.S. Computer Science - MIT", "M.S. Software Engineering"] },
    { category: "Languages", items: ["English (Native)", "Spanish (Fluent)", "French (Basic)"] },
  ];

  return (
    <div
      className="h-full overflow-y-auto p-8"
      style={{ backgroundColor: "#f6f5ff" }}
    >
      <div className="space-y-6" style={{ maxWidth: '1400px' }}>
        {/* Page Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: "#7c3aed" }}>
              <Upload className="h-6 w-6 text-white" />
            </div>
            <h1
              className="font-semibold"
              style={{ fontSize: '2.05rem', lineHeight: 1.15, color: '#1e1b4b',marginLeft: '0.5rem' }}
            >
              Upload and Process CVs
            </h1>
          </div>
          <p className="text-muted-foreground" style={{ fontSize: '1.125rem' }}>
            Extract skills and information from resumes automatically
          </p>
        </div>

        {/* Upload Section */}
        <Card className="border-2 shadow-lg">
          <CardContent className="pt-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInput}
              accept=".pdf,.doc,.docx,.txt"
              multiple
              className="hidden"
            />
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-4 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
                ${
                  isDragging
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:border-purple-400 hover:bg-purple-50/50"
                }
              `}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full" style={{ backgroundColor: '#7c3aed' }}>
                  <Upload className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h3 className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                    Drop your CV files here or click to browse
                  </h3>
                  <p className="text-muted-foreground mb-4" style={{ fontSize: '1rem' }}>
                    Supported formats: PDF, DOCX, DOC, TXT
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <Badge
                      variant="outline"
                      className="border-2"
                      style={{ fontSize: '0.95rem', paddingInline: '0.85rem', paddingBlock: '0.25rem' }}
                    >
                      Max size: 10MB
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-2"
                      style={{ fontSize: '0.95rem', paddingInline: '0.85rem', paddingBlock: '0.25rem' }}
                    >
                      Multiple files allowed
                    </Badge>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="mt-4 text-white hover:bg-[#6d28d9]"
                  style={{ backgroundColor: '#7c3aed' }}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Upload CV
                </Button>
              </div>
            </div>

            {/* Security Note */}
              <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground" style={{ fontSize: '0.95rem' }}>
              <Shield className="h-4 w-4 text-green-600" />
              <span>Files are stored securely in Azure cloud with end-to-end encryption</span>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b-2" style={{ backgroundColor: '#f0eeff' }}>
              <CardTitle className="text-2xl">Uploaded Files</CardTitle>
              <CardDescription className="text-base">Processing status for your uploaded CVs</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center gap-4 p-4 rounded-lg border-2 bg-white"
                  >
                    <FileText className="h-10 w-10 text-purple-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="truncate" style={{ fontSize: '1.05rem' }}>{file.name}</p>
                        <Badge
                          className={
                            file.status === "completed"
                              ? "bg-green-100 text-green-700 border-green-200 border"
                              : file.status === "error"
                              ? "bg-red-100 text-red-700 border-red-200 border"
                              : "bg-blue-100 text-blue-700 border-blue-200 border"
                          }
                        >
                          {file.status === "uploading" && "Uploading"}
                          {file.status === "processing" && "Processing"}
                          {file.status === "completed" && "Completed"}
                          {file.status === "error" && "Error"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2" style={{ fontSize: '0.9rem' }}>
                        {formatFileSize(file.size)}
                      </p>
                      <Progress value={file.progress} className="h-2" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.name)}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Processing Features */}
        
        {/* Skill Extraction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Extraction Features */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b-2" style={{ backgroundColor: '#f0eeff' }}>
              <CardTitle className="text-2xl">Smart Data Extraction</CardTitle>
              <CardDescription className="text-base">
                Automatically identifies and extracts key information
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {extractionFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-lg border-2 p-4"
                    style={{ backgroundColor: '#f9f7ff' }}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color} flex-shrink-0 mt-0.5`} />
                    <div>
                      <h3 className="mb-1" style={{ fontSize: '1.05rem', fontWeight: 600 }}>{feature.title}</h3>
                      <p className="text-muted-foreground" style={{ fontSize: '0.9rem' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sample Preview */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="border-b-2" style={{ backgroundColor: '#eefbf6' }}>
              <CardTitle className="text-2xl">Extracted Data Preview</CardTitle>
              <CardDescription className="text-base">
                Example of automatically extracted information
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {sampleExtractedData.map((data, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 bg-white"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg">{data.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {data.items.map((item, i) => (
                        <Badge
                          key={i}
                          className="border"
                          style={{
                            backgroundColor: '#ede9fe',
                            color: '#5b21b6',
                            borderColor: '#ddd6fe',
                            fontSize: '0.95rem',
                            paddingInline: '0.8rem',
                            paddingBlock: '0.2rem',
                          }}
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Azure Cloud Info */}
        <Card className="border-2 shadow-lg" style={{ backgroundColor: '#eef4ff' }}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#0ea5e9' }}>
                <Cloud className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="mb-1" style={{ fontSize: '1.35rem', fontWeight: 600 }}>Azure Cloud Integration</h3>
                <p className="text-muted-foreground" style={{ fontSize: '1rem' }}>
                  Your files are processed using Microsoft Azure's enterprise-grade infrastructure with advanced security, compliance, and data protection.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Badge
                  className="bg-green-100 text-green-700 border-green-200 border"
                  style={{ fontSize: '0.95rem', paddingInline: '0.8rem', paddingBlock: '0.2rem' }}
                >
                  SOC 2 Certified
                </Badge>
                <Badge
                  className="bg-blue-100 text-blue-700 border-blue-200 border"
                  style={{ fontSize: '0.95rem', paddingInline: '0.8rem', paddingBlock: '0.2rem' }}
                >
                  GDPR Compliant
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
