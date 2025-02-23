package lt.TomasC.Devjobs_web_app.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class ImageFileValidator implements ConstraintValidator<ValidImage, MultipartFile> {
    private static final long MAX_SIZE = 5 * 1024 * 1024;
    private static final List<String> VALID_CONTENT_TYPES = List.of(
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/jpg"
    );

    @Override
    public boolean isValid(MultipartFile file, ConstraintValidatorContext constraintValidatorContext) {
       if (file == null || file.isEmpty()) {
           return false;
       }
       if (file.getSize() > MAX_SIZE) {
           constraintValidatorContext.disableDefaultConstraintViolation();
           constraintValidatorContext.buildConstraintViolationWithTemplate("File size must be less than 5MB")
                   .addConstraintViolation();
           return false;
       }
       if (!VALID_CONTENT_TYPES.contains(file.getContentType())) {
           constraintValidatorContext.disableDefaultConstraintViolation();
           constraintValidatorContext.buildConstraintViolationWithTemplate("Only JPEG,PNG,JPG,GIF is allowed")
                   .addConstraintViolation();
           return false;
       }
       return true;
    }
}
