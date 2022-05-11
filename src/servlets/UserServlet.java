/**
 * Загрузка файлов на сервер описана в классе UploadServlet.java по следующему адресу
 * https://github.com/Dew25/JKTVR19WebLibrary/blob/insertFile/src/java/servlets/UploadServlet.java
 */
package servlets;

import entity.AccountData;
import entity.Role;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.List;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import jsonbuilders.AccountDataJsonBuilder;
import jsonbuilders.RoleJsonBuilder;
import jsonbuilders.UserJsonBuilder;
import sessian.AccountDataFacade;
import sessian.RoleFacade;
import sessian.UserFacade;
import sessian.UserRolesFacade;
import tools.PasswordProtected;

/**
 *
 * @author user
 */
@WebServlet(name = "UserServlet", urlPatterns = {
    "/getListAccountData",
    "/addNewAccount",
    
})
@MultipartConfig
public class UserServlet extends HttpServlet {
    @EJB private UserFacade userFacade;
    @EJB private RoleFacade roleFacade;
    @EJB private UserRolesFacade userRolesFacade;
    @EJB private AccountDataFacade accountDataFacade;
    
    private PasswordProtected pp = new PasswordProtected();
    
    
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        JsonObjectBuilder job = Json.createObjectBuilder();
        HttpSession session = request.getSession(false);
        if(session == null){
            job.add("info", "Вы не авторизованы");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        User authUser = (User) session.getAttribute("authUser");
        if(authUser == null){
            job.add("info", "Вы не авторизованы");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        if(!userRolesFacade.isRole("USER",authUser)){
            job.add("info", "У вас нет необходимых разрешений");
                    job.add("auth", false);
                    try (PrintWriter out = response.getWriter()) {
                        out.println(job.build().toString());
                    }
                    return;
        }
        String path = request.getServletPath();
        switch (path) {
            case "/getListAccountData":
                String userId = request.getParameter("userId");
                if(!userId.equals(authUser.getId().toString())){
                    job.add("listAccountData", "")
                       .add("status", false)
                       .add("info", "Вы не тот за кого себя выдаете");
                    break;
                }
                List<AccountData> listAccountData = accountDataFacade.findAll(authUser);
                if(listAccountData.isEmpty()){
                    job.add("listAccountData", "");
                    job.add("status", true).add("info", "Список пуст");
                    try (PrintWriter out = response.getWriter()) {
                      out.println(job.build().toString());
                    } 
                    break;
                }
                AccountDataJsonBuilder adjb = new AccountDataJsonBuilder();
                job.add("listAccountData", adjb.getJsonArrayAccountData(listAccountData));
                job.add("status", true).add("info", "");
                try (PrintWriter out = response.getWriter()) {
                  out.println(job.build().toString());
                } 
                break;
            case "/addNewAccount":
               Part part = request.getPart("imageFile");
               StringBuilder pathToUploadUserDir = new StringBuilder(); // создаем пустой экземпляр класса StringBuilder
               pathToUploadUserDir.append("D:\\uploadDir\\SPTV20PasswordManager") 
                                  .append(File.separator)
                                  .append(authUser.getId().toString()); //каталог с именем равным идентификатору пользователя
               File mkDirFile = new File(pathToUploadUserDir.toString());
               mkDirFile.mkdirs(); //Создаем путь к каталогу, где хранятся изображения для конкретного пользователя
               StringBuilder pathToUploadFile = new StringBuilder(); // Здесь будет путь к загруженному файлу
               pathToUploadFile.append(pathToUploadUserDir.toString())
                               .append(File.separator)
                               .append(getFileName(part));
               File file = new File(pathToUploadFile.toString()); //Дескриптор для загружаемого файла
               try(InputStream fileContent = part.getInputStream()){ // получаем ресурс - поток данных загружаемого файла
                    Files.copy(
                            fileContent, // поток данных
                            file.toPath(), // путь к сохраняемому файлу
                            StandardCopyOption.REPLACE_EXISTING // опция: пересоздать файл, если такой уже есть на диске.
                    );
                }
               // здесь пишем код, который:
               // 1. создает сущность
               // 2. получает путь к загруженному файлу для добавления его к сущности
               // 3. получает из запроса url, login, password
               // 4. инициирует сущность и сохраняет ее в базу
        //----- так как данные приходят от формы, то получаем данные из запроса через метод getParameter();   
               String caption = request.getParameter("caption");
               String url = request.getParameter("url");
               String login = request.getParameter("login");
               String password = request.getParameter("password");
               AccountData accountData = new AccountData();
               accountData.setCaption(caption);
               accountData.setLogin(login);
               accountData.setPassword(password);
               accountData.setUrl(url);
               accountData.setPathToImage(pathToUploadFile.toString());
               accountData.setUser(authUser);
               accountDataFacade.create(accountData);
               job.add("info", "Добавлен новый аккаунт");
               job.add("status", true);
               try (PrintWriter out = response.getWriter()) {
                  out.println(job.build().toString());
               }
               break;
        }
        
    }
    private String getFileName(Part part){
        final String partHeader = part.getHeader("content-disposition");
        for (String content : part.getHeader("content-disposition").split(";")){
            if(content.trim().startsWith("filename")){
                return content
                        .substring(content.indexOf('=')+1)
                        .trim()
                        .replace("\"",""); 
            }
        }
        return null;
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
