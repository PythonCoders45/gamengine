cmake_minimum_required(VERSION 3.10)
project(ehowlEngine CXX)

set(CMAKE_CXX_STANDARD 17)

# Add all engine core sources and ImGui files
add_executable(ehowlEngine
    main.cpp
    imgui/imgui.cpp
    imgui/imgui_draw.cpp
    imgui/imgui_tables.cpp
    imgui/imgui_widgets.cpp
    imgui/backends/imgui_impl_glfw.cpp
    imgui/backends/imgui_impl_opengl3.cpp
)

# Include header search paths
target_include_directories(ehowlEngine PRIVATE
    .
    imgui
    imgui/backends
)

# Find and link required packages (GLFW, OpenGL, system libraries)
find_package(glfw3 REQUIRED)
find_package(OpenGL REQUIRED)

target_link_libraries(ehowlEngine PRIVATE glfw OpenGL::GL dl pthread)
