package lt.TomasC.Devjobs_web_app.util;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

public class WebUtil {

    public static URI createLocation(String path, long id) {
        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(path)
                .buildAndExpand(id)
                .toUri();
    }

}
